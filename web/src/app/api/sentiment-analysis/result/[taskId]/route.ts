import { NextRequest, NextResponse } from 'next/server';

// Esta es la URL de tu API Kubernetes
const API_URL = process.env.API_URL || 'http://34.41.106.124';

// En Next.js 15 con App Router, necesitamos modificar cómo accedemos a los parámetros
export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  // Evita acceder directamente a params.taskId (el error que estás viendo)
  // Extrae el taskId de la URL como alternativa
  const url = request.url;
  const segments = url.split('/');
  const taskId = segments[segments.length - 1];

  try {
    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      );
    }
    
    // Configurar un timeout más largo (15 segundos)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    
    try {
      // Consultar estado de la tarea con timeout
      const response = await fetch(`${API_URL}/result/${taskId}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 404) {
          return NextResponse.json({ status: "pending" });
        }
        
        const errorText = await response.text();
        console.error(`API error: ${response.status} - ${errorText}`);
        return NextResponse.json(
          { error: `Error from analysis service: ${response.status}` },
          { status: response.status }
        );
      }
      
      const data = await response.json();
      return NextResponse.json(data);
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        // Si hay timeout, asumimos que la tarea sigue pendiente
        return NextResponse.json({ status: "pending", message: "Request timed out, still processing" });
      }
      
      throw fetchError;
    }
  } catch (error: any) {
    console.error('Error checking task status:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check task status' },
      { status: 500 }
    );
  }
} 