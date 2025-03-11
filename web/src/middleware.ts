import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware para mejorar la seguridad y el rendimiento de la aplicación
 * Ejecutado antes de cualquier solicitud
 */
export function middleware(request: NextRequest) {
  // Verificar si la ruta se debe omitir para evitar problemas
  if (shouldSkipMiddleware(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  
  // Configuración de cabeceras de seguridad para todas las respuestas
  const response = NextResponse.next();
  
  // Agregar cabeceras de seguridad
  addSecurityHeaders(response);
  
  // Optimización de cache para recursos estáticos
  if (request.nextUrl.pathname.startsWith('/_next/static')) {
    addCacheHeaders(response);
  }
  
  return response;
}

/**
 * Determina si una ruta debe omitir el procesamiento del middleware
 */
function shouldSkipMiddleware(pathname: string): boolean {
  const skippedPaths = [
    '/_next/webpack-hmr',
    '/_next/static',
    '/favicon.ico',
    '/api/health',
  ];
  
  return skippedPaths.some(path => pathname.startsWith(path));
}

/**
 * Agrega cabeceras de seguridad a la respuesta
 */
function addSecurityHeaders(response: NextResponse): void {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Agregar cabecera strict-transport-security para HTTPS
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
}

/**
 * Agrega cabeceras de caché para optimizar el rendimiento
 */
function addCacheHeaders(response: NextResponse): void {
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  response.headers.set('Vary', 'Accept-Encoding');
}

// Especificar rutas en las que se aplicará este middleware
export const config = {
  matcher: [
    // Excluir archivos estáticos y API routes que no necesitan procesamiento
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico)$).*)',
  ],
}; 