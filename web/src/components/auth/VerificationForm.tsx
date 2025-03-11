'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { verifyCode, resendVerificationCode } from '@/utils/auth/config';
import { AUTH_CONFIG } from '@/utils/auth/config';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useThrottle } from '@/hooks/useThrottle';
import { supabase } from '@/utils/supabaseClient';
import '@/sass/components/auth/_verification.sass';

export default function VerificationForm() {
  const router = useRouter();
  const { trackEvent } = useAnalytics();
  const formRef = useRef<HTMLFormElement>(null);
  const codeInputs = useRef<(HTMLInputElement | null)[]>([]);
  
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [email, setEmail] = useState('');

  // Get email from session storage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('verifying_email');
    if (!storedEmail) {
      router.replace(AUTH_CONFIG.ROUTES.SIGN_IN);
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  // Verificar si hay una sesión activa
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Verificar si el usuario está verificado usando los metadatos
      const isVerified = session?.user?.user_metadata?.is_verified === true;
      
      // Log para depuración
      console.log('Checking session:', {
        hasSession: !!session,
        isVerified,
        userMetadata: session?.user?.user_metadata
      });
      
      if (session && isVerified) {
        console.log('Session is verified, redirecting to services');
        router.push(AUTH_CONFIG.ROUTES.SERVICES);
      } else if (session) {
        console.log('Session exists but not verified, staying on verification page');
        // Si hay sesión pero no está verificada, nos quedamos en la página de verificación
      } else {
        console.log('No session, redirecting to sign in');
        router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
      }
    };
    
    checkSession();
    
    // Configurar un listener para cambios en la sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Verificar si el usuario está verificado usando los metadatos
      const isVerified = session?.user?.user_metadata?.is_verified === true;
      
      // Log para depuración
      console.log('Auth state changed:', {
        event,
        hasSession: !!session,
        isVerified,
        userMetadata: session?.user?.user_metadata
      });
      
      if (event === 'SIGNED_OUT' || !session) {
        router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
      } else if (event === 'SIGNED_IN' && isVerified) {
        console.log('User signed in and verified, redirecting to services');
        router.push(AUTH_CONFIG.ROUTES.SERVICES);
      } else if (event === 'SIGNED_IN') {
        console.log('User signed in but not verified, staying on verification page');
        // No hacer nada, mantener al usuario en la página de verificación
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleCodeChange = useCallback((index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    setVerificationCode(prev => {
      const newCode = [...prev];
      newCode[index] = value;
      return newCode;
    });

    // Auto-focus next input
    if (value && index < 5) {
      codeInputs.current[index + 1]?.focus();
    }

    // Clear error message on input
    setErrorMsg('');
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputs.current[index - 1]?.focus();
    } else if (e.key === 'Enter' && verificationCode.every(digit => digit)) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }, [verificationCode]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/.test(pastedData)) return;

    const digits = pastedData.split('');
    setVerificationCode(digits);
    codeInputs.current[5]?.focus();
  }, []);

  const handleSubmit = useThrottle(async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const code = verificationCode.join('');
    if (code.length !== 6) {
      setErrorMsg('Please enter the complete verification code.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      trackEvent(AUTH_CONFIG.ANALYTICS.EVENTS.VERIFICATION_ATTEMPT, { email });
      
      // Verificar el código con Supabase
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email'
      });
      
      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Error verificando código:', error);
        }
        
        if (error.message.includes('Invalid token') || error.message.includes('Invalid otp')) {
          setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.INVALID_CODE);
        } else if (error.message.includes('Token has expired')) {
          setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.VERIFICATION_EXPIRED);
        } else {
          setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.VERIFICATION_ERROR);
        }
        
        trackEvent(AUTH_CONFIG.ANALYTICS.EVENTS.VERIFICATION_ERROR, {
          error: error.message,
          email
        });
        
        setVerificationCode(['', '', '', '', '', '']);
        codeInputs.current[0]?.focus();
        return;
      }
      
      if (!data?.session) {
        setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.SESSION_ERROR);
        return;
      }

      // Actualizar los metadatos del usuario para marcar como verificado
      const { error: updateError } = await supabase.auth.updateUser({
        data: { is_verified: true }
      });

      if (updateError) {
        console.error('Error updating user metadata:', updateError);
        setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.VERIFICATION_ERROR);
        return;
      }
      
      // Log para depuración
      console.log('Verification successful:', {
        session: !!data.session,
        userMetadata: data.session?.user?.user_metadata
      });
      
      setSuccessMsg(AUTH_CONFIG.SUCCESS_MESSAGES.VERIFICATION_SUCCESS);
      trackEvent(AUTH_CONFIG.ANALYTICS.EVENTS.VERIFICATION_SUCCESS, { email });
      
      // Limpiar email de verificación
      sessionStorage.removeItem('verifying_email');
      
      // Redirección después de un breve delay
      setTimeout(() => {
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
        const decodedReturnUrl = returnUrl ? decodeURIComponent(returnUrl) : AUTH_CONFIG.ROUTES.SERVICES;
        router.push(decodedReturnUrl);
      }, AUTH_CONFIG.TIMEOUTS.REDIRECT_DELAY);
      
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Error en verificación:', error);
      }
      
      trackEvent(AUTH_CONFIG.ANALYTICS.EVENTS.VERIFICATION_ERROR, {
        error: error instanceof Error ? error.message : 'Unknown error',
        email
      });
      
      setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.GENERIC_ERROR);
      setVerificationCode(['', '', '', '', '', '']);
      codeInputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }, 1000);

  const handleResend = useCallback(async () => {
    if (loading) return;
    
    setErrorMsg('');
    setLoading(true);
    
    try {
      const result = await resendVerificationCode(email);
      
      if (!result.success) {
        setErrorMsg(result.message || 'Failed to resend code. Please try again.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try again.');
      console.error('Resend error:', err);
    } finally {
      setLoading(false);
    }
  }, [email, loading]);

  const handleBackToSignIn = useCallback(() => {
    router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
  }, [router]);

  return (
    <div className="verification-container">
      <nav className="verification-nav">
        <div className="verification-nav-brand">
          TBWA<span>\</span>INTELLIGENCE
        </div>
      </nav>

      <div className="verification-content">
        <h1>Welcome back to</h1>
        <h2>
          INTELLIGENCE<span>\</span><br />
          PLATFORM
        </h2>

        <p>Verification code sent to:</p>
        <div className="verification-email">{email}</div>

        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="verification-form"
          noValidate
        >
          <div className="verification-code-inputs">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={el => {
                  if (el) codeInputs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={e => handleCodeChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(e, index)}
                onPaste={handlePaste}
                disabled={loading}
                className={errorMsg ? 'error' : ''}
                aria-label={`Digit ${index + 1}`}
                required
              />
            ))}
          </div>

          {(errorMsg || successMsg) && (
            <div 
              className={`verification-message ${
                errorMsg ? 'verification-message-error' : 'verification-message-success'
              }`}
              role="alert"
            >
              {errorMsg || successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || verificationCode.some(digit => !digit)}
            className="verification-button"
          >
            Verify Code
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="verification-actions">
          <button onClick={handleResend} disabled={loading}>
            Resend code
          </button>
          <button onClick={handleBackToSignIn}>
            Back to sign in
          </button>
        </div>
      </div>

      <footer className="common-footer">
        <div className="footer-brand">
          TBWA Intelligence Analytics Platform
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} TBWA Intelligence. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 