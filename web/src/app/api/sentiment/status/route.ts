import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const SENTIMENT_API_URL = process.env.SENTIMENT_API_URL || 'http://34.41.106.124';
console.log('[CONFIG] URL del API de sentimientos (status):', SENTIMENT_API_URL);

export async function GET(req: NextRequest) {
  try {
    console.log('[DEBUG] Iniciando consulta de estado');
    
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get('taskId');

    console.log('[DEBUG] Task ID recibido:', taskId);

    if (!taskId) {
      console.error('[ERROR] No se proporcionó taskId');
      return NextResponse.json(
        { error: 'Se requiere taskId' },
        { status: 400 }
      );
    }

    try {
      console.log(`[DEBUG] Consultando estado de tarea ${taskId}`);
      
      const response = await axios.get(`${SENTIMENT_API_URL}/result/${taskId}`, {
        timeout: 5000, // 5 segundos de timeout
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log(`[DEBUG] Estado de tarea ${taskId}:`, response.data);

      // Validar la estructura de la respuesta
      if (!response.data?.state) {
        console.error('[ERROR] Respuesta inválida del servidor:', response.data);
        return NextResponse.json(
          { error: 'Respuesta inválida del servidor' },
          { status: 500 }
        );
      }

      // Si el estado es SUCCESS, validar que tengamos resultados
      if (response.data.state === 'SUCCESS' && (!response.data.result?.results || !Array.isArray(response.data.result.results))) {
        console.error('[ERROR] Estado SUCCESS pero sin resultados válidos:', response.data);
        return NextResponse.json(
          { error: 'El servidor reportó éxito pero no devolvió resultados válidos' },
          { status: 500 }
        );
      }

      return NextResponse.json(response.data);
      
    } catch (error: any) {
      console.error(`[ERROR] Error al consultar estado de tarea ${taskId}:`, error);
      
      if (error.response?.status === 404) {
        console.error('[ERROR] Tarea no encontrada:', taskId);
        return NextResponse.json(
          { error: 'Tarea no encontrada' },
          { status: 404 }
        );
      }

      if (error.code === 'ECONNABORTED') {
        console.error('[ERROR] Timeout al consultar estado');
        return NextResponse.json(
          { error: 'Timeout al consultar estado de la tarea' },
          { status: 504 }
        );
      }

      console.error('[ERROR] Detalles de la respuesta:', error.response?.data);
      return NextResponse.json(
        { 
          error: 'Error al consultar estado de la tarea', 
          details: error.message,
          response: error.response?.data 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('[ERROR] Error en el endpoint de estado:', error);
    return NextResponse.json(
      { error: 'Error en el servidor', details: error.message },
      { status: 500 }
    );
  }
} 