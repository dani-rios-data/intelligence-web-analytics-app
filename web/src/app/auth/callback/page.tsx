'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import { AUTH_CONFIG } from '@/utils/auth/config';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Procesar el callback de autenticación de Supabase
    const handleAuthCallback = async () => {
      try {
        // Obtener los parámetros de la URL
        const hash = window.location.hash;
        const params = new URLSearchParams(window.location.search);
        
        // Verificar si hay un error en los parámetros
        if (params.get('error')) {
          const errorDescription = params.get('error_description') || 'Authentication error';
          // Solo log en desarrollo
          if (process.env.NODE_ENV === 'development') {
            console.log('Error en el callback de autenticación:', errorDescription);
          }
          setError(errorDescription);
          setTimeout(() => {
            router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
          }, 3000);
          return;
        }
        
        // Procesar el hash o los parámetros de la URL
        if (hash || params.has('code')) {
          // Esperar a que Supabase procese la autenticación
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            // Solo log en desarrollo
            if (process.env.NODE_ENV === 'development') {
              console.log('Error al procesar el callback de autenticación:', error);
            }
            setError('Failed to authenticate. Please try again.');
            setTimeout(() => {
              router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
            }, 3000);
            return;
          }
          
          if (data?.session) {
            console.log('Session established successfully');
            // Redirigir al usuario a la página de verificación en lugar de servicios
            router.push(AUTH_CONFIG.ROUTES.VERIFICATION);
          } else {
            // Si no hay sesión, intentar establecerla con los parámetros de la URL
            if (params.has('code')) {
              const { data: exchangeData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(params.get('code') || '');
              
              if (exchangeError) {
                // Solo log en desarrollo
                if (process.env.NODE_ENV === 'development') {
                  console.log('Error al intercambiar código por sesión:', exchangeError);
                }
                setError('Failed to complete authentication. Please try again.');
                setTimeout(() => {
                  router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
                }, 3000);
                return;
              }
              
              if (exchangeData?.session) {
                console.log('Session established through code exchange');
                
                // Almacenar el correo para la página de verificación
                if (exchangeData.user?.email) {
                  sessionStorage.setItem('verifying_email', exchangeData.user.email);
                }
                
                // Asegurarse de que no se marca como verificado aquí
                // NO establecer code_verified = true
                
                // Redirigir a la página de verificación
                router.push(AUTH_CONFIG.ROUTES.VERIFICATION);
                return;
              }
            }
            
            // Si aún no hay sesión, redirigir al inicio de sesión
            if (process.env.NODE_ENV === 'development') {
              console.log('No session established after authentication');
            }
            setError('Authentication completed but no session was established. Please try again.');
            setTimeout(() => {
              router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
            }, 3000);
          }
        } else {
          // Si no hay hash ni código, redirigir al inicio de sesión
          if (process.env.NODE_ENV === 'development') {
            console.log('No authentication parameters found in URL');
          }
          setError('No authentication data found. Please try signing in again.');
          setTimeout(() => {
            router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
          }, 3000);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Error en el callback de autenticación:', error);
        }
        setError('An unexpected error occurred. Please try again.');
        setTimeout(() => {
          router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        {error ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-500">Authentication Error</h1>
            <p className="mb-4">{error}</p>
            <p>Redirecting to sign in page...</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Processing authentication...</h1>
            <p>Please wait while we complete the sign-in process.</p>
            <div className="mt-4 w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </>
        )}
      </div>
    </div>
  );
} 