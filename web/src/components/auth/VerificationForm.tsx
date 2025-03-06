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
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        // Si ya hay una sesión activa, redirigir al usuario
        router.push(AUTH_CONFIG.ROUTES.SERVICES);
      }
    };
    
    checkSession();
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
      
      // Usar directamente la API de Supabase para verificar el código
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email'
      });
      
      if (error) {
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
        
        // Limpiar código en caso de error
        setVerificationCode(['', '', '', '', '', '']);
        codeInputs.current[0]?.focus();
        return;
      }
      
      if (!data?.session) {
        setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.SESSION_ERROR);
        return;
      }
      
      setSuccessMsg(AUTH_CONFIG.SUCCESS_MESSAGES.VERIFICATION_SUCCESS);
      trackEvent(AUTH_CONFIG.ANALYTICS.EVENTS.VERIFICATION_SUCCESS, { email });
      sessionStorage.removeItem('verifying_email');
      
      // Redirección al menú de servicios después de un breve delay
      setTimeout(() => {
        router.push(AUTH_CONFIG.ROUTES.SERVICES);
      }, AUTH_CONFIG.TIMEOUTS.REDIRECT_DELAY);
    } catch (error) {
      console.error('Error in verification:', error);
      trackEvent(AUTH_CONFIG.ANALYTICS.EVENTS.VERIFICATION_ERROR, {
        error: error instanceof Error ? error.message : 'Unknown error',
        email
      });
      
      setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.GENERIC_ERROR);
      
      // Limpiar código en caso de error
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

      <footer className="verification-footer">
        <p>TBWA Intelligence Analytics Platform</p>
        <p>© {new Date().getFullYear()} TBWA Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
} 