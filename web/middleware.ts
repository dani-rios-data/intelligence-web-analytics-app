import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  try {
    // Crear cliente de Supabase
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    // Rutas públicas que no requieren verificación
    const publicRoutes = ['/signin', '/verification', '/auth/callback', '/api/auth'];
    const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route));

    // Si es una ruta pública, permitir el acceso
    if (isPublicRoute) {
      return res;
    }

    // Verificar la sesión de Supabase
    const { data: { session }, error } = await supabase.auth.getSession();

    // Log para depuración
    console.log('Middleware check:', {
      path: req.nextUrl.pathname,
      hasSession: !!session,
      sessionError: error,
      userMetadata: session?.user?.user_metadata
    });

    // Si no hay sesión o hay error, redirigir a signin
    if (!session || error) {
      console.log('No valid session found, redirecting to signin');
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    // Verificar si el usuario está verificado usando los metadatos de usuario
    const isVerified = session.user?.user_metadata?.is_verified === true;

    // Si no está verificado, redirigir a la página de verificación
    if (!isVerified) {
      console.log('User not verified, redirecting to verification');
      const returnUrl = encodeURIComponent(req.nextUrl.pathname);
      return NextResponse.redirect(new URL(`/verification?returnUrl=${returnUrl}`, req.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: [
    // Excluir archivos estáticos y rutas de API
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 