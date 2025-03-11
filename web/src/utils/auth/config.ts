import { AuthOptions } from 'next-auth';
import { createClient } from '@supabase/supabase-js';

// Authentication Configuration Constants
export const AUTH_CONFIG = {
  ROUTES: {
    SIGN_IN: '/signin',
    VERIFICATION: '/verification',
    AUTH_CALLBACK: '/auth/callback',
    SERVICES: '/services',
    DASHBOARD: '/services',
  },
  TIMEOUTS: {
    ANIMATION_STEP: 200,
    REDIRECT_DELAY: 1500,
    RESEND_COOLDOWN: 30,
    SESSION_CHECK: 5000,
  },
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MIN_EMAIL_LENGTH: 5,
    MAX_EMAIL_LENGTH: 255,
  },
  ERROR_MESSAGES: {
    EMPTY_FIELDS: 'Please enter your email address.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    UNAUTHORIZED_EMAIL: 'This email is not authorized to access.',
    EMAIL_SEND_ERROR: 'Error sending verification code. Please try again.',
    NETWORK_ERROR: 'Connection error. Please check your internet connection.',
    RATE_LIMIT_EXCEEDED: 'Too many attempts. Please wait a few minutes before trying again.',
    GENERIC_ERROR: 'Something went wrong. Please try again.',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
    VERIFICATION_EXPIRED: 'Invalid verification code. Please try again.',
    INVALID_CODE: 'Invalid verification code. Please check and try again.',
    VERIFICATION_ERROR: 'Error verifying code. Please try again.',
    SESSION_ERROR: 'Failed to establish session. Please try again.',
  },
  SUCCESS_MESSAGES: {
    MAGIC_LINK_SENT: 'Verification code sent. Please check your email.',
    VERIFICATION_SUCCESS: 'Verification successful. Redirecting...',
  },
  ANALYTICS: {
    EVENTS: {
      SIGN_IN_ATTEMPT: 'sign_in_attempt',
      SIGN_IN_SUCCESS: 'sign_in_success',
      SIGN_IN_ERROR: 'sign_in_error',
      VERIFICATION_ATTEMPT: 'verification_attempt',
      VERIFICATION_SUCCESS: 'verification_success',
      VERIFICATION_ERROR: 'verification_error',
    },
  },
  VERIFICATION_CODE: {
    LENGTH: 6,
    EXPIRY_MINUTES: 10,
    RESEND_DELAY: 30000, // 30 seconds in milliseconds
    MAX_ATTEMPTS: 3,
  },
  SECURITY: {
    MAX_FAILED_ATTEMPTS: 10,
    LOCKOUT_DURATION: 60,
    SESSION_DURATION: 3600,
  }
} as const;

// Tipos para las respuestas de las funciones de autenticación
interface AuthResponse {
  success: boolean;
  message?: string;
  redirectUrl?: string;
}

// Función para verificar el código
export async function verifyCode(email: string, code: string): Promise<AuthResponse> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email'
    });

    if (error) {
      if (error.message.includes('Invalid token') || error.message.includes('Invalid otp')) {
        return {
          success: false,
          message: AUTH_CONFIG.ERROR_MESSAGES.INVALID_CODE
        };
      } else if (error.message.includes('Token has expired')) {
        return {
          success: false,
          message: AUTH_CONFIG.ERROR_MESSAGES.VERIFICATION_EXPIRED
        };
      }
      
      return {
        success: false,
        message: AUTH_CONFIG.ERROR_MESSAGES.VERIFICATION_ERROR
      };
    }

    if (!data?.session) {
      return {
        success: false,
        message: AUTH_CONFIG.ERROR_MESSAGES.SESSION_ERROR
      };
    }

    return {
      success: true,
      redirectUrl: AUTH_CONFIG.ROUTES.SERVICES
    };
  } catch (err) {
    console.error('Error during verification:', err);
    return {
      success: false,
      message: AUTH_CONFIG.ERROR_MESSAGES.GENERIC_ERROR
    };
  }
}

// Función para reenviar el código de verificación
export async function resendVerificationCode(email: string): Promise<AuthResponse> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}${AUTH_CONFIG.ROUTES.AUTH_CALLBACK}`,
        shouldCreateUser: false
      }
    });

    if (error) {
      return {
        success: false,
        message: AUTH_CONFIG.ERROR_MESSAGES.EMAIL_SEND_ERROR
      };
    }

    return {
      success: true,
      message: AUTH_CONFIG.SUCCESS_MESSAGES.MAGIC_LINK_SENT
    };
  } catch (err) {
    console.error('Error resending verification code:', err);
    return {
      success: false,
      message: AUTH_CONFIG.ERROR_MESSAGES.GENERIC_ERROR
    };
  }
}

// Environment validation
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// NextAuth configuration
export const authOptions: AuthOptions = {
  debug: false,
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user?.email) return false;

        const { data, error } = await supabase
          .from('allowed_emails')
          .select('email')
          .eq('email', user.email)
          .single();

        if (error) {
          console.error('Error checking allowed emails:', error);
          return false;
        }

        return !!data;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  pages: {
    signIn: AUTH_CONFIG.ROUTES.SIGN_IN,
    error: AUTH_CONFIG.ROUTES.SIGN_IN,
    signOut: AUTH_CONFIG.ROUTES.SIGN_IN,
  },
  events: {
    signIn({ user }) { 
      console.log('Successful sign in for user:', user.email);
    },
    signOut() { 
      console.log('User signed out');
    }
  }
}; 