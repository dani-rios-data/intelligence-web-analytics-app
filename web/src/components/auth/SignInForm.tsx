'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Skull } from 'lucide-react';
import { supabase } from '@/utils/supabaseClient';
import { AUTH_CONFIG } from '@/utils/auth/config';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useThrottle } from '@/hooks/useThrottle';
import '@/sass/components/auth/_signin.sass';

export default function SignInForm() {
  const router = useRouter();
  const { trackEvent } = useAnalytics();
  const formRef = useRef<HTMLFormElement>(null);
  
  // State management
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Handle animations with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev < 4 ? prev + 1 : prev));
    }, AUTH_CONFIG.TIMEOUTS.ANIMATION_STEP);
    return () => clearInterval(timer);
  }, []);

  // Handle resend cooldown with cleanup
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendCountdown]);

  // Reset failed attempts after lockout period
  useEffect(() => {
    if (failedAttempts >= AUTH_CONFIG.SECURITY.MAX_FAILED_ATTEMPTS) {
      const timer = setTimeout(() => {
        setFailedAttempts(0);
        setIsResendDisabled(false);
      }, AUTH_CONFIG.SECURITY.LOCKOUT_DURATION * 1000);
      return () => clearTimeout(timer);
    }
  }, [failedAttempts]);

  // Validate email with proper error handling
  const validateEmail = useCallback((email: string): boolean => {
    if (!email || email.length < AUTH_CONFIG.VALIDATION.MIN_EMAIL_LENGTH) {
      setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.EMPTY_FIELDS);
      return false;
    }
    if (email.length > AUTH_CONFIG.VALIDATION.MAX_EMAIL_LENGTH) {
      setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.INVALID_EMAIL);
      return false;
    }
    if (!AUTH_CONFIG.VALIDATION.EMAIL_REGEX.test(email)) {
      setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.INVALID_EMAIL);
      return false;
    }
    return true;
  }, []);

  // Throttled submit handler to prevent spam
  const handleSubmit = useThrottle(async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || isResendDisabled) return;

    // Security check for failed attempts
    if (failedAttempts >= AUTH_CONFIG.SECURITY.MAX_FAILED_ATTEMPTS) {
      setErrorMsg(AUTH_CONFIG.ERROR_MESSAGES.RATE_LIMIT_EXCEEDED);
      return;
    }

    // Client-side validation
    if (!validateEmail(email)) {
      setFailedAttempts(prev => prev + 1);
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      trackEvent(AUTH_CONFIG.ANALYTICS.EVENTS.SIGN_IN_ATTEMPT, { email });
      const normalizedEmail = email.trim().toLowerCase();

      // Check if email is allowed using RPC function
      const { data: isAllowed, error: rpcError } = await supabase.rpc(
        'check_allowed_email',
        { email_param: normalizedEmail }
      );

      if (rpcError) {
        console.error('Error checking allowed email:', rpcError);
        if (rpcError.message.includes('connection')) {
          throw new Error(AUTH_CONFIG.ERROR_MESSAGES.NETWORK_ERROR);
        }
        throw new Error(AUTH_CONFIG.ERROR_MESSAGES.UNAUTHORIZED_EMAIL);
      }

      if (!isAllowed) {
        throw new Error(AUTH_CONFIG.ERROR_MESSAGES.UNAUTHORIZED_EMAIL);
      }

      // Send verification code
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          emailRedirectTo: `${window.location.origin}${AUTH_CONFIG.ROUTES.AUTH_CALLBACK}`,
          shouldCreateUser: false // Only allow existing emails
        }
      });

      if (signInError) {
        console.error('Error sending verification code:', signInError);
        if (signInError.message.includes('rate limit')) {
          throw new Error(AUTH_CONFIG.ERROR_MESSAGES.RATE_LIMIT_EXCEEDED);
        }
        throw new Error(AUTH_CONFIG.ERROR_MESSAGES.EMAIL_SEND_ERROR);
      }

      // Success handling
      trackEvent(AUTH_CONFIG.ANALYTICS.EVENTS.SIGN_IN_SUCCESS, { email });
      setSuccessMsg(AUTH_CONFIG.SUCCESS_MESSAGES.MAGIC_LINK_SENT);
      sessionStorage.setItem('verifying_email', normalizedEmail);
      setIsResendDisabled(true);
      setResendCountdown(AUTH_CONFIG.VERIFICATION_CODE.RESEND_DELAY / 1000);
      setFailedAttempts(0);
      
      // Redirect to verification page after a short delay
      setTimeout(() => {
        router.push(AUTH_CONFIG.ROUTES.VERIFICATION);
      }, AUTH_CONFIG.TIMEOUTS.REDIRECT_DELAY);

    } catch (error) {
      console.error('Error in handleSubmit:', error);
      trackEvent(AUTH_CONFIG.ANALYTICS.EVENTS.SIGN_IN_ERROR, { 
        error: error instanceof Error ? error.message : 'Unknown error',
        email 
      });
      
      setErrorMsg(
        error instanceof Error ? error.message : AUTH_CONFIG.ERROR_MESSAGES.GENERIC_ERROR
      );
      setFailedAttempts(prev => prev + 1);
      
      // If it's not an unauthorized email error, show retry button after delay
      if (error instanceof Error && 
          error.message !== AUTH_CONFIG.ERROR_MESSAGES.UNAUTHORIZED_EMAIL) {
        setIsResendDisabled(true);
        setResendCountdown(AUTH_CONFIG.TIMEOUTS.RESEND_COOLDOWN);
      }
    } finally {
      setLoading(false);
    }
  }, 1000); // Throttle submissions to once per second

  // Handle keyboard navigation
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }, []);

  return (
    <div className="signin-container">
      <div className="signin-background">
        <div className={`signin-background-line-vertical ${animationStep >= 1 ? 'active' : ''}`} />
        <div className={`signin-background-line-horizontal-top ${animationStep >= 2 ? 'active' : ''}`} />
        <div className={`signin-background-line-horizontal-bottom ${animationStep >= 3 ? 'active' : ''}`} />
      </div>

      <nav className={`signin-nav ${animationStep >= 1 ? 'active' : ''}`}>
        <div className="signin-nav-brand">
          TBWA<span>\</span>INTELLIGENCE
        </div>
        <Skull className="signin-nav-icon" aria-hidden="true" />
      </nav>

      <main className="signin-content">
        <div className="signin-content-wrapper">
          <div className="signin-header">
            <div className={`signin-header-slash ${animationStep >= 2 ? 'active' : ''}`} aria-hidden="true">\</div>
            <h1>
              {['ARE YOU', 'READY TO', 'DISRUPT?'].map((line) => (
                <div key={line} className={animationStep >= 2 ? 'active' : ''}>
                  {line}
                </div>
              ))}
            </h1>
          </div>

          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className={`signin-form ${animationStep >= 3 ? 'active' : ''}`}
            noValidate
          >
            <div className="signin-input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
                onKeyPress={handleKeyPress}
                placeholder="YOUR EMAIL"
                disabled={loading || isResendDisabled}
                className={errorMsg ? 'error' : ''}
                aria-label="Email address"
                aria-invalid={!!errorMsg}
                aria-describedby={errorMsg ? 'email-error' : undefined}
                required
                autoComplete="email"
                autoFocus
              />
              <div className="signin-input-group-line" aria-hidden="true" />
            </div>

            <button
              type="submit"
              disabled={loading || isResendDisabled}
              className="signin-button group"
              aria-busy={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              ) : (
                <>
                  <span className="signin-button-text">
                    {isResendDisabled 
                      ? `RETRY IN ${resendCountdown}s`
                      : 'SEND CODE'}
                  </span>
                  <ArrowRight className="signin-button-icon" aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          {(errorMsg || successMsg) && (
            <div 
              className={`signin-message ${
                errorMsg ? 'signin-message-error' : 'signin-message-success'
              }`}
              role="alert"
              id={errorMsg ? 'email-error' : undefined}
            >
              {errorMsg || successMsg}
            </div>
          )}

          <div 
            className={`signin-footer-message ${animationStep >= 4 ? 'active' : ''}`}
            aria-hidden="true"
          >
            FOR SOME, "GOOD ENOUGH" WILL ALWAYS BE ENOUGH.<br />
            BUT MAYBE NOT FOR YOU. WELCOME.
          </div>
        </div>
      </main>

      <footer className={`signin-app-footer ${animationStep >= 4 ? 'active' : ''}`}>
        <div className="signin-app-footer-content">
          <p className="signin-app-footer-platform">TBWA Intelligence Analytics Platform</p>
          <p>© {new Date().getFullYear()} TBWA Intelligence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 