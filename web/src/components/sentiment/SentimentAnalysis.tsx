'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileSpreadsheet, ArrowLeft, AlertCircle, CheckCircle2, ChevronDown, RefreshCw, Bug } from 'lucide-react';
import * as XLSX from 'xlsx-js-style';
import JSZip from 'jszip';
import '@/sass/components/sentiment/_analysis.sass';
import Papa from 'papaparse';

type FileType = 'csv' | 'xlsx' | 'xls';

interface UploadStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
  fileName: string | null;
  columns: string[];
  data: any[] | null;
}

interface ApiResponse {
  message: string;
  task_id: string;
}

interface CommentResult {
  comment: string;
  sentiment: number;
  categories: string;
}

export default function SentimentAnalysis() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    loading: false,
    error: null,
    success: false,
    fileName: null,
    columns: [],
    data: null
  });
  const [debugMode, setDebugMode] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Debug logger function
  const logDebug = (message: string) => {
    if (debugMode) {
      console.log(`[DEBUG] ${message}`);
      setDebugLogs(prev => [...prev, `${new Date().toISOString().split('T')[1].substring(0, 8)} - ${message}`]);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const validTypes: FileType[] = ['csv', 'xlsx', 'xls'];
    const fileType = file.name.split('.').pop()?.toLowerCase() as FileType;
    
    if (!validTypes.includes(fileType)) {
      return {
        valid: false,
        error: 'Please upload a CSV, XLSX, or XLS file'
      };
    }
    
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      return {
        valid: false,
        error: 'File size should be less than 50MB'
      };
    }

    return { valid: true };
  };

  const detectDelimiter = (csvContent: string): string => {
    const firstLine = csvContent.split('\n')[0];
    const delimiters = [',', ';', '\t'];
    const counts = delimiters.map(delimiter => ({
      delimiter,
      count: (firstLine.match(new RegExp(delimiter, 'g')) || []).length
    }));
    
    const mostFrequent = counts.reduce((max, current) => 
      current.count > max.count ? current : max
    );
    
    return mostFrequent.count > 0 ? mostFrequent.delimiter : ',';
  };

  const processFileData = async (file: File) => {
    return new Promise<{ data: any[], columns: string[] }>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const fileType = file.name.split('.').pop()?.toLowerCase() as FileType;
          
          if (fileType === 'csv') {
            // Para archivos CSV, detectar el delimitador
            const csvContent = data as string;
            const delimiter = detectDelimiter(csvContent);
            
            const workbook = XLSX.read(csvContent, {
              type: 'string',
              raw: true,
              cellDates: true,
              dateNF: 'yyyy-mm-dd',
              sheets: 0,
              FS: delimiter
            });
            
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
              raw: false,
              dateNF: 'yyyy-mm-dd',
              defval: '',
              blankrows: false,
              header: 1
            });

            // Verificar si la primera fila parece ser headers
            const firstRow = jsonData[0] as string[];
            const secondRow = jsonData[1] as any[];
            const hasHeaders = firstRow.some((cell, index) => {
              const secondRowCell = secondRow?.[index];
              return (
                // El header parece ser un texto descriptivo
                (typeof cell === 'string' && cell.length > 0) &&
                // Y la segunda fila parece ser datos
                (secondRowCell === undefined || 
                 typeof secondRowCell === 'number' ||
                 (typeof secondRowCell === 'string' && /\d/.test(secondRowCell)))
              );
            });

            if (hasHeaders) {
              // Asegurar que los nombres de columnas sean únicos
              const uniqueColumns = makeColumnsUnique(firstRow.map(header => 
                typeof header === 'string' ? header.trim() : String(header)
              ));
              
              const data = XLSX.utils.sheet_to_json(firstSheet, {
                raw: false,
                dateNF: 'yyyy-mm-dd',
                defval: '',
                blankrows: false,
                header: uniqueColumns
              });
              
              resolve({ 
                data,
                columns: uniqueColumns
              });
            } else {
              // Si no hay headers, crear headers genéricos y únicos
              const genericColumns = firstRow.map((_, i) => `Column ${i + 1}`);
              const data = XLSX.utils.sheet_to_json(firstSheet, {
                raw: false,
                dateNF: 'yyyy-mm-dd',
                defval: '',
                blankrows: false,
                header: genericColumns
              });
              resolve({ 
                data,
                columns: genericColumns
              });
            }
          } else {
            // Para archivos Excel
            const workbook = XLSX.read(data, { 
              type: 'binary',
              cellDates: true,
              dateNF: 'yyyy-mm-dd'
            });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            
            // Intentar leer con headers
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
              raw: false,
              dateNF: 'yyyy-mm-dd',
              defval: '',
              blankrows: false
            });

            if (jsonData.length > 0) {
              // Asegurar que los nombres de columnas sean únicos
              const firstRow = jsonData[0] as Record<string, any>;
              const columns = makeColumnsUnique(Object.keys(firstRow));
              
              // Reconstruir los datos con las columnas únicas
              const dataWithUniqueKeys = jsonData.map((row: any) => {
                const newRow: Record<string, any> = {};
                Object.keys(row).forEach((key, index) => {
                  newRow[columns[index]] = row[key];
                });
                return newRow;
              });
              
              resolve({ data: dataWithUniqueKeys, columns });
            } else {
              reject(new Error('No data found in file'));
            }
          }
        } catch (error) {
          console.error('Error processing file:', error);
          reject(new Error('Error processing file. Please check the file format.'));
        }
      };
      
      reader.onerror = () => reject(new Error('Error reading file'));
      
      if (file.name.toLowerCase().endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    });
  };

  // Función para asegurar que los nombres de columnas sean únicos
  const makeColumnsUnique = (columns: string[]): string[] => {
    const uniqueColumns: string[] = [];
    const columnCounts: Record<string, number> = {};
    const problematicColumns = ['Account', 'Permalink', 'account', 'permalink', 'ACCOUNT', 'PERMALINK'];
    
    return columns.map((col, index) => {
      // Si la columna está vacía, asignar un nombre genérico
      if (!col || col.trim() === '') {
        col = `Column_${index + 1}`;
      }
      
      // Normalizar el nombre de la columna (eliminar espacios y caracteres especiales)
      const normalizedCol = col
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^\w\d_]/g, '')
        .replace(/_{2,}/g, '_');
      
      // Si después de normalizar queda vacío, usar un nombre genérico
      const safeCol = normalizedCol || `Column_${index + 1}`;
      
      // Tratar específicamente las columnas problemáticas
      if (problematicColumns.includes(col)) {
        return `${safeCol}_field_${index}`;
      }
      
      // Inicializar contador si no existe
      if (!columnCounts[safeCol]) {
        columnCounts[safeCol] = 0;
      }
      
      // Incrementar contador
      columnCounts[safeCol]++;
      
      // Si es la primera vez que aparece, usar el nombre normalizado
      if (columnCounts[safeCol] === 1) {
        uniqueColumns.push(safeCol);
        return safeCol;
      }
      
      // Si ya existe, agregar un sufijo numérico
      const uniqueCol = `${safeCol}_${columnCounts[safeCol]}`;
      uniqueColumns.push(uniqueCol);
      return uniqueCol;
    });
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      setUploadStatus({
        loading: false,
        error: validation.error || 'Invalid file',
        success: false,
        fileName: null,
        columns: [],
        data: null
      });
      return;
    }

    handleFileUpload(file);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      setUploadStatus({
        loading: false,
        error: validation.error || 'Invalid file',
        success: false,
        fileName: null,
        columns: [],
        data: null
      });
      return;
    }

    handleFileUpload(file);
  }, []);

  const handleFileUpload = async (file: File) => {
    setUploadStatus({
      loading: true,
      error: null,
      success: false,
      fileName: file.name,
      columns: [],
      data: null
    });

    try {
      const { data, columns } = await processFileData(file);
      
      setUploadStatus({
        loading: false,
        error: null,
        success: true,
        fileName: file.name,
        columns,
        data
      });
    } catch (error: any) {
      setUploadStatus({
        loading: false,
        error: error.message || 'Error processing file. Please try again.',
        success: false,
        fileName: null,
        columns: [],
        data: null
      });
    }
  };

  const handleColumnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(e.target.value);
  };

  const processComments = async () => {
    if (!uploadStatus.data || !selectedColumn) {
      logDebug('[processComments] Error: No hay datos o columna seleccionada');
      return;
    }
    
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    
    setIsProcessing(true);
    setProcessingStatus('Preparando archivo para análisis...');
    setProcessingProgress(5);

    try {
      logDebug('[processComments] Iniciando procesamiento de comentarios');
      logDebug(`[processComments] Columna seleccionada: ${selectedColumn}`);
      
      // Convertir los datos a CSV usando PapaParse
      const csvData = Papa.unparse(uploadStatus.data);
      
      // Crear FormData con el archivo CSV y la columna seleccionada
      const formData = new FormData();
      const csvBlob = new Blob([csvData], { type: 'text/csv' });
      formData.append('file', csvBlob, 'input.csv');
      formData.append('column', selectedColumn);
      
      logDebug('[processComments] Enviando archivo al servidor...');
      
      // Enviar la solicitud al servidor para encolar
      const response = await fetch('/api/sentiment', {
        method: 'POST',
        body: formData,
        signal: signal
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el servidor');
      }

      const { taskId, totalComments } = await response.json();
      logDebug(`[processComments] Task ID recibido: ${taskId}`);
      
      // Configuración para el polling
      const maxAttempts = 40;
      const initialInterval = 3000;
      const maxInterval = 10000;
      let attempt = 0;

      // Función para calcular el intervalo con backoff exponencial
      const getInterval = (attempt: number): number => {
        const exponentialWait = Math.min(
          maxInterval,
          initialInterval * Math.pow(1.5, attempt)
        );
        // Añadir jitter (±20%)
        const jitter = exponentialWait * 0.2 * (Math.random() * 2 - 1);
        return Math.floor(exponentialWait + jitter);
      };

      // Iniciar polling
      const pollStatus = async () => {
        if (attempt >= maxAttempts || signal.aborted) {
          throw new Error('Tiempo de espera agotado o proceso cancelado');
        }

        attempt++;
        const interval = getInterval(attempt);
        
        try {
          const statusResponse = await fetch(`/api/sentiment/status?taskId=${taskId}`, {
            signal: signal
          });

          if (!statusResponse.ok) {
            const errorData = await statusResponse.json();
            throw new Error(errorData.error || 'Error al consultar estado');
          }

          const statusData = await statusResponse.json();
          logDebug(`[processComments] Estado: ${statusData.state}, Intento: ${attempt}`);

          if (statusData.state === 'SUCCESS') {
            setProcessingStatus('Descargando resultados...');
            setProcessingProgress(90);

            // Descargar resultados
            const downloadResponse = await fetch(
              `/api/sentiment/download?taskId=${taskId}&csvData=${encodeURIComponent(csvData)}`,
              { signal: signal }
            );

            if (!downloadResponse.ok) {
              throw new Error('Error al descargar resultados');
            }

            const blob = await downloadResponse.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'sentiment_analysis_results.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);

            setProcessingStatus('¡Análisis completado!');
            setProcessingProgress(100);
            return;
          }

          if (statusData.state === 'FAILURE') {
            throw new Error('El análisis falló en el servidor');
          }

          // Actualizar progreso basado en el intento actual
          const progress = Math.min(85, 5 + (attempt / maxAttempts) * 80);
          setProcessingProgress(Math.round(progress));
          setProcessingStatus(`Procesando comentarios... (Intento ${attempt}/${maxAttempts})`);

          // Esperar antes del siguiente intento
          await new Promise(resolve => setTimeout(resolve, interval));
          return pollStatus();
        } catch (error: any) {
          if (error.name === 'AbortError' || signal.aborted) {
            throw new Error('Proceso cancelado por el usuario');
          }
          throw error;
        }
      };

      // Iniciar el polling
      await pollStatus();

    } catch (error: any) {
      logDebug(`Error en el procesamiento: ${error.message}`);
      console.error('Error processing comments:', error);
      
      if (error.name === 'AbortError' || signal.aborted) {
        setProcessingStatus('Procesamiento cancelado por el usuario');
      } else {
        setProcessingStatus('Error durante el análisis');
        setUploadStatus(prev => ({
          ...prev,
          error: error.message
        }));
      }
    } finally {
      abortControllerRef.current = null;
      setTimeout(() => {
        setIsProcessing(false);
        if (!signal.aborted) {
          setProcessingStatus('');
          setProcessingProgress(0);
        }
      }, 2000);
    }
  };

  const handleBack = () => {
    router.push('/services');
  };

  const resetState = () => {
    // Cancelar cualquier procesamiento en curso
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    setUploadStatus({
      loading: false,
      error: null,
      success: false,
      fileName: null,
      columns: [],
      data: null
    });
    setSelectedColumn('');
    setIsProcessing(false);
    setProcessingStatus('');
    setProcessingProgress(0);
    
    // Limpiar input de archivo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="sentiment-container">
      <nav className="sentiment-nav">
        <div className="sentiment-nav-content">
          <button onClick={handleBack} className="sentiment-back-button">
            <ArrowLeft size={20} />
            <span>Back to Services</span>
          </button>
          <div className="sentiment-nav-brand">
            TBWA<span>\</span>INTELLIGENCE
          </div>
          <div className="sentiment-nav-actions">
            <button 
              onClick={() => setDebugMode(!debugMode)} 
              className={`sentiment-debug-toggle ${debugMode ? 'active' : ''}`}
              title="Toggle Debug Mode"
            >
              <Bug size={16} />
            </button>
          </div>
        </div>
      </nav>

      <main className="sentiment-content">
        {debugMode && debugLogs.length > 0 && (
          <div className="sentiment-debug-logs">
            <h3>Debug Logs</h3>
            <div className="sentiment-debug-log-content">
              {debugLogs.map((log, index) => (
                <div key={index} className="sentiment-debug-log-entry">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="sentiment-header">
          <h1>Social Media Sentiment Analysis</h1>
          <p>Upload your data file to analyze social media comments and engagement patterns</p>
        </div>

        <div className="sentiment-upload-section">
          {uploadStatus.success ? (
            <div className="sentiment-success-actions">
              <div className="sentiment-upload-success">
                <CheckCircle2 size={48} />
                <p>{uploadStatus.fileName}</p>
                <span>File uploaded successfully</span>
              </div>
              
              <button 
                onClick={resetState}
                className="sentiment-reset-button"
                disabled={isProcessing}
              >
                <RefreshCw size={20} />
                Upload New File
              </button>
            </div>
          ) : (
            <div 
              className={`sentiment-upload-area ${dragActive ? 'drag-active' : ''} 
                         ${uploadStatus.error ? 'has-error' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                ref={fileInputRef}
                className="sentiment-file-input"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
              />
              
              <label htmlFor="file-upload" className="sentiment-upload-label">
                {uploadStatus.loading ? (
                  <div className="sentiment-upload-loading">
                    <div className="spinner" />
                    <p>Processing {uploadStatus.fileName}...</p>
                  </div>
                ) : (
                  <div className="sentiment-upload-prompt">
                    <Upload size={48} />
                    <p>Drag and drop your file here or click to browse</p>
                    <span>Supports CSV, XLSX, and XLS files (max 50MB)</span>
                  </div>
                )}
              </label>

              {uploadStatus.error && (
                <div className="sentiment-upload-error">
                  <AlertCircle size={20} />
                  <span>{uploadStatus.error}</span>
                </div>
              )}
            </div>
          )}

          {uploadStatus.success && (
            <div className="sentiment-column-selection">
              <div className="sentiment-processing-options">
                <div className="sentiment-column-wrapper">
                  <label htmlFor="comment-column" className="sentiment-select-label">Comments Column</label>
              <select 
                    id="comment-column"
                value={selectedColumn} 
                onChange={handleColumnSelect}
                className="sentiment-column-select"
                    disabled={isProcessing}
              >
                <option value="">Select comments column</option>
                {uploadStatus.columns.map((column, index) => (
                  <option key={`col-${index}-${column}`} value={column}>{column}</option>
                ))}
              </select>
                </div>
              </div>

              <div className="sentiment-actions">
              <button
                onClick={processComments}
                disabled={!selectedColumn || isProcessing}
                className="sentiment-process-button"
              >
                {isProcessing ? (
                  <>
                    <div className="spinner-small" />
                    {processingStatus}
                    </>
                  ) : (
                    'Process Comments'
                  )}
                </button>
                
                {isProcessing && (
                  <button
                    onClick={resetState}
                    className="sentiment-cancel-button"
                  >
                    Cancel Processing
                  </button>
                )}
              </div>
              
              {isProcessing && processingProgress > 0 && (
                <div className="sentiment-progress-section">
                      <div className="sentiment-progress-container">
                        <div 
                          className="sentiment-progress-bar"
                          style={{ width: `${processingProgress}%` }}
                        ></div>
                  </div>
                  <div className="sentiment-progress-percentage">
                    {Math.round(processingProgress)}%
                  </div>
                      </div>
                    )}
              
              {isProcessing && (
                <div className="sentiment-processing-note">
                  <AlertCircle size={16} />
                  <span>
                    Processing comments in small batches for maximum reliability. 
                    This may take some time for large files.
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="sentiment-file-types">
            <div className="sentiment-file-type">
              <FileSpreadsheet size={24} />
              <span>CSV</span>
            </div>
            <div className="sentiment-file-type">
              <FileSpreadsheet size={24} />
              <span>XLSX</span>
            </div>
            <div className="sentiment-file-type">
              <FileSpreadsheet size={24} />
              <span>XLS</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 