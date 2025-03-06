import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import Papa from 'papaparse';
import archiver from 'archiver';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import os from 'os';

const SENTIMENT_API_URL = process.env.SENTIMENT_API_URL || 'http://34.41.106.124';

// Función para generar un nombre de archivo temporal único
const getTempFilePath = (prefix: string, extension: string) => {
  return path.join(os.tmpdir(), `${prefix}-${Date.now()}${extension}`);
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get('taskId');
    const csvData = searchParams.get('csvData');

    if (!taskId || !csvData) {
      return NextResponse.json(
        { error: 'Se requiere taskId y csvData' },
        { status: 400 }
      );
    }

    try {
      // Obtener resultados del análisis
      const response = await axios.get(`${SENTIMENT_API_URL}/result/${taskId}`, {
        timeout: 5000
      });

      if (response.data.state !== 'SUCCESS' || !response.data.result?.results) {
        return NextResponse.json(
          { error: 'Los resultados no están listos o son inválidos' },
          { status: 400 }
        );
      }

      // Parsear el CSV original
      const parsed = Papa.parse(csvData, { header: true });
      const rows = parsed.data as any[];

      // Combinar resultados con datos originales
      const results = response.data.result.results;
      const outputRows = rows.map((row, index) => ({
        ...row,
        sentiment_score: results[index]?.sentiment || 'N/A',
        sentiment_categories: results[index]?.categories || 'Not analyzed'
      }));

      // Generar CSV actualizado
      const outputCsv = Papa.unparse(outputRows);
      const outputPath = getTempFilePath('output', '.csv');
      await fsPromises.writeFile(outputPath, outputCsv, 'utf8');

      // Crear ZIP
      const zipPath = getTempFilePath('output', '.zip');
      const archive = archiver('zip', { zlib: { level: 9 } });
      const output = fs.createWriteStream(zipPath);

      await new Promise((resolve, reject) => {
        output.on('close', resolve);
        archive.on('error', reject);
        archive.pipe(output);
        archive.file(outputPath, { name: 'sentiment_analysis_results.csv' });
        archive.finalize();
      });

      // Leer el ZIP y enviarlo como respuesta
      const zipContent = await fsPromises.readFile(zipPath);

      // Limpiar archivos temporales
      await Promise.all([
        fsPromises.unlink(outputPath),
        fsPromises.unlink(zipPath)
      ]).catch(console.error);

      return new NextResponse(zipContent, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename=sentiment_analysis_results.zip'
        }
      });

    } catch (error: any) {
      console.error('Error al descargar resultados:', error);
      return NextResponse.json(
        { error: 'Error al descargar resultados', details: error.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error en el endpoint de descarga:', error);
    return NextResponse.json(
      { error: 'Error en el servidor', details: error.message },
      { status: 500 }
    );
  }
} 