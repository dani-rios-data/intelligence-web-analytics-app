import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import Papa from 'papaparse';
import axios from 'axios';
import archiver from 'archiver';
import { promises as fsPromises } from 'fs';
import path from 'path';
import os from 'os';

// Asegurarnos de que tenemos la URL del API
const SENTIMENT_API_URL = process.env.SENTIMENT_API_URL || 'http://34.41.106.124';
console.log('[CONFIG] URL del API de sentimientos:', SENTIMENT_API_URL);

// Función para generar un nombre de archivo temporal único
const getTempFilePath = (prefix: string, extension: string) => {
  return path.join(os.tmpdir(), `${prefix}-${Date.now()}${extension}`);
};

// Función para procesar un lote de comentarios
async function processBatch(comments: string[]): Promise<any[]> {
  try {
    // Llama a la API externa para encolar los comentarios
    const enqueueResponse = await axios.post(
      'http://34.41.106.124/enqueue-comments',
      { comments }
    );
    
    if (!enqueueResponse.data.task_id) {
      throw new Error('No se recibió task_id del servidor');
    }
    
    const taskId = enqueueResponse.data.task_id;
    console.log(`Task ID recibido: ${taskId}`);

    // Hacemos polling hasta que la tarea retorne estado SUCCESS
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      const resultResponse = await axios.get(
        `http://34.41.106.124/result/${taskId}`
      );
      
      console.log(`Intento ${attempts + 1}: Estado = ${resultResponse.data.state}`);
      
      if (resultResponse.data.state === 'SUCCESS') {
        return resultResponse.data.result.results;
      } else if (resultResponse.data.state === 'FAILURE') {
        throw new Error('La tarea falló en el servidor');
      }
      
      // Espera 2 segundos antes de volver a consultar
      await new Promise((resolve) => setTimeout(resolve, 2000));
      attempts++;
    }
    
    throw new Error('Tiempo de espera agotado');
  } catch (error: any) {
    console.error('Error en processBatch:', error.message);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('[DEBUG] Iniciando procesamiento de solicitud POST');
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const commentColumn = formData.get('column') as string;

    console.log('[DEBUG] Columna seleccionada:', commentColumn);

    if (!file) {
      console.error('[ERROR] No se proporcionó archivo');
      return NextResponse.json(
        { error: 'Archivo no proporcionado' },
        { status: 400 }
      );
    }

    if (!commentColumn) {
      console.error('[ERROR] No se proporcionó columna de comentarios');
      return NextResponse.json(
        { error: 'Columna de comentarios no especificada' },
        { status: 400 }
      );
    }

    // Crear archivo temporal para el CSV
    const csvPath = getTempFilePath('input', '.csv');
    const buffer = Buffer.from(await file.arrayBuffer());
    await fsPromises.writeFile(csvPath, buffer);

    console.log('[DEBUG] Archivo temporal creado en:', csvPath);

    // Leer y parsear el CSV
    const fileContent = await fsPromises.readFile(csvPath, 'utf8');
    const parsed = Papa.parse(fileContent, { 
      header: true,
      skipEmptyLines: true 
    });
    
    if (parsed.errors.length > 0) {
      console.error('[ERROR] Errores al parsear CSV:', parsed.errors);
      return NextResponse.json(
        { error: 'Error al parsear el CSV', details: parsed.errors },
        { status: 400 }
      );
    }

    console.log('[DEBUG] Columnas detectadas:', Object.keys(parsed.data[0] || {}));
    
    if (!parsed.data[0]?.hasOwnProperty(commentColumn)) {
      console.error('[ERROR] La columna especificada no existe en el CSV');
      return NextResponse.json(
        { error: `La columna "${commentColumn}" no existe en el archivo` },
        { status: 400 }
      );
    }

    const rows = parsed.data as any[];
    const comments = rows
      .map((row) => row[commentColumn])
      .filter(comment => comment && typeof comment === 'string' && comment.trim() !== '')
      .map(comment => comment.trim());

    console.log('[DEBUG] Total de comentarios extraídos:', comments.length);
    console.log('[DEBUG] Primeros 3 comentarios:', comments.slice(0, 3));

    if (comments.length === 0) {
      console.error('[ERROR] No se encontraron comentarios válidos');
      return NextResponse.json(
        { error: 'No se encontraron comentarios válidos en la columna seleccionada' },
        { status: 400 }
      );
    }

    // Enviar comentarios al servicio de análisis
    try {
      console.log('[DEBUG] Enviando comentarios al API:', SENTIMENT_API_URL);
      
      const response = await axios.post(`${SENTIMENT_API_URL}/enqueue-comments`, {
        comments
      }, {
        timeout: 10000, // 10 segundos de timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('[DEBUG] Respuesta del API:', response.data);

      if (!response.data?.task_id) {
        console.error('[ERROR] No se recibió task_id del servidor');
        throw new Error('No se recibió task_id del servidor');
      }

      // Devolver el task_id al cliente
      return NextResponse.json({
        taskId: response.data.task_id,
        message: 'Comentarios encolados exitosamente',
        totalComments: comments.length
      });

    } catch (error: any) {
      console.error('[ERROR] Error al encolar comentarios:', error);
      console.error('[ERROR] Detalles de la respuesta:', error.response?.data);
      
      return NextResponse.json(
        { 
          error: 'Error al encolar comentarios para análisis', 
          details: error.message,
          response: error.response?.data 
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('[ERROR] Error en el procesamiento:', error);
    return NextResponse.json(
      { error: 'Error en el servidor', details: error.message },
      { status: 500 }
    );
  }
} 