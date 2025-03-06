'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import { AUTH_CONFIG } from '@/utils/auth/config';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Procesar el callback de autenticación de Supabase
    const handleAuthCallback = async () => {
      try {
        // Obtener los parámetros de la URL
        const hash = window.location.hash;
        
        if (hash) {
          // Procesar el hash para obtener el token
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Error al procesar el callback de autenticación:', error);
            router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
            return;
          }
          
          if (data?.session) {
            // Redirigir al usuario a la página de servicios
            router.push(AUTH_CONFIG.ROUTES.SERVICES);
          } else {
            // Si no hay sesión, redirigir al inicio de sesión
            router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
          }
        } else {
          // Si no hay hash, redirigir al inicio de sesión
          router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
        }
      } catch (error) {
        console.error('Error en el callback de autenticación:', error);
        router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Procesando autenticación...</h1>
        <p>Por favor espere mientras completamos el proceso de inicio de sesión.</p>
      </div>
    </div>
  );
} 