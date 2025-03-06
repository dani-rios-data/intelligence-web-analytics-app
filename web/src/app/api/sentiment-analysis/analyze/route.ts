import { NextRequest, NextResponse } from 'next/server';

// Esta es la URL de tu API Kubernetes
const API_URL = process.env.API_URL || 'http://34.41.106.124';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.comments || !Array.isArray(body.comments)) {
      return NextResponse.json(
        { error: 'Invalid request: comments array is required' },
        { status: 400 }
      );
    }
    
    // Filtrar comentarios vacíos o inválidos
    const validComments = body.comments
      .filter((comment: any) => comment && typeof comment === 'string' && comment.trim() !== '')
      .map((comment: string) => comment.trim());
    
    if (validComments.length === 0) {
      return NextResponse.json(
        { error: 'No valid comments to analyze' },
        { status: 400 }
      );
    }
    
    // Limitar el número de comentarios por solicitud
    if (validComments.length > 1000) {
      return NextResponse.json(
        { error: 'Too many comments. Please limit to 1000 comments per request.' },
        { status: 400 }
      );
    }
    
    // Configurar un timeout más largo (30 segundos)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    try {
      // Enviar a la API de microservicio con timeout
      const response = await fetch(`${API_URL}/enqueue-comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments: validComments }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
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
        return NextResponse.json(
          { error: 'Request to analysis service timed out' },
          { status: 504 }
        );
      }
      
      throw fetchError;
    }
  } catch (error: any) {
    console.error('Error submitting comments:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit comments for analysis' },
      { status: 500 }
    );
  }
} 