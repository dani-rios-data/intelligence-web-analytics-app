'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/utils/supabaseClient';
import { AUTH_CONFIG } from '@/utils/auth/config';
import '@/sass/components/services/_service-layout.sass';

interface ServiceLayoutProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  children: React.ReactNode;
}

export default function ServiceLayout({ title, icon, description, children }: ServiceLayoutProps) {
  const router = useRouter();
  const [animationStep, setAnimationStep] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        
        // Función para verificar si el código ha sido verificado
        const isCodeVerified = () => {
          // Verificar cookie
          const cookies = document.cookie.split('; ');
          const codeVerifiedCookie = cookies.find(cookie => cookie.startsWith('code_verified='));
          const cookieVerified = codeVerifiedCookie ? codeVerifiedCookie.split('=')[1] === 'true' : false;
          
          // Log para depuración
          console.log('ServiceLayout - Checking if code is verified:', {
            cookieVerified,
            codeVerifiedCookie,
            allCookies: document.cookie
          });
          
          // Verificar sessionStorage
          const sessionVerified = sessionStorage.getItem('code_verified') === 'true';
          
          return cookieVerified || sessionVerified;
        };
        
        if (!data?.session || !isCodeVerified()) {
          console.log('No active session or code not verified, redirecting to sign in');
          router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error checking authentication:', error);
        router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Configurar listener para cambios en la sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Función para verificar si el código ha sido verificado
      const isCodeVerified = () => {
        // Verificar cookie
        const cookies = document.cookie.split('; ');
        const codeVerifiedCookie = cookies.find(cookie => cookie.startsWith('code_verified='));
        const cookieVerified = codeVerifiedCookie ? codeVerifiedCookie.split('=')[1] === 'true' : false;
        
        // Log para depuración
        console.log('ServiceLayout - Checking if code is verified:', {
          cookieVerified,
          codeVerifiedCookie,
          allCookies: document.cookie
        });
        
        // Verificar sessionStorage
        const sessionVerified = sessionStorage.getItem('code_verified') === 'true';
        
        return cookieVerified || sessionVerified;
      };
      
      if (event === 'SIGNED_OUT' || !session || !isCodeVerified()) {
        router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Handle animations with cleanup
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 200);
    return () => clearInterval(timer);
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="service-layout-loading">
        <div className="service-layout-loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="service-layout-container">
      <div className="service-layout-background">
        <div className={`service-layout-background-line-vertical ${animationStep >= 1 ? 'active' : ''}`} />
        <div className={`service-layout-background-line-horizontal-top ${animationStep >= 2 ? 'active' : ''}`} />
        <div className={`service-layout-background-line-horizontal-bottom ${animationStep >= 3 ? 'active' : ''}`} />
      </div>

      <nav className={`service-layout-nav ${animationStep >= 1 ? 'active' : ''}`}>
        <div className="service-layout-nav-brand">
          TBWA<span>\</span>INTELLIGENCE
        </div>
        <div className="service-layout-nav-actions">
          <button 
            onClick={() => router.push('/services')}
            className="service-layout-nav-back"
          >
            <ArrowLeft size={20} />
            <span>Back to Services</span>
          </button>
          <button 
            onClick={async () => {
              sessionStorage.removeItem('code_verified');
              await supabase.auth.signOut();
              router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
            }}
            className="service-layout-nav-signout"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="service-layout-content">
        <div className={`service-layout-header ${animationStep >= 2 ? 'active' : ''}`}>
          <div className="service-layout-header-icon">
            {icon}
          </div>
          <div className="service-layout-header-text">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>

        <div className={`service-layout-body ${animationStep >= 3 ? 'active' : ''}`}>
          {children}
        </div>
      </main>

      <footer className={`service-layout-footer ${animationStep >= 4 ? 'active' : ''}`}>
        <p>TBWA Intelligence Analytics Platform</p>
        <p>© {new Date().getFullYear()} TBWA Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
} 