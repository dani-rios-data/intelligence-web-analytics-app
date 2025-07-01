// Simple Password Authentication Configuration
export const AUTH_CONFIG = {
  // Static credentials for simple authentication
  CREDENTIALS: {
    PASSWORD: 'TBWAIntelligence2024!',
    ADMIN_EMAIL: 'admin@tbwaintelligence.com'
  },
  ROUTES: {
    SIGN_IN: '/signin',
    SERVICES: '/services',
    DASHBOARD: '/services',
  },
  TIMEOUTS: {
    ANIMATION_STEP: 200,
    REDIRECT_DELAY: 1500,
    SESSION_CHECK: 5000,
  },
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGTH: 128,
  },
  ERROR_MESSAGES: {
    EMPTY_FIELDS: 'Please enter the access password.',
    INVALID_PASSWORD: 'Invalid password. Please try again.',
    NETWORK_ERROR: 'Connection error. Please check your internet connection.',
    RATE_LIMIT_EXCEEDED: 'Too many attempts. Please wait a few minutes before trying again.',
    GENERIC_ERROR: 'Something went wrong. Please try again.',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
  },
  SUCCESS_MESSAGES: {
    LOGIN_SUCCESS: 'Login successful. Redirecting...',
  },
  ANALYTICS: {
    EVENTS: {
      SIGN_IN_ATTEMPT: 'sign_in_attempt',
      SIGN_IN_SUCCESS: 'sign_in_success',
      SIGN_IN_ERROR: 'sign_in_error',
    },
  },
  SECURITY: {
    MAX_FAILED_ATTEMPTS: 5,
    LOCKOUT_DURATION: 300, // 5 minutes
    SESSION_DURATION: 3600, // 1 hour
  }
} as const;

// Authentication response interface
interface AuthResponse {
  success: boolean;
  message?: string;
  redirectUrl?: string;
}

// Simple password verification function
export async function verifyPassword(password: string): Promise<AuthResponse> {
  try {
    // Simple password check
    if (password === AUTH_CONFIG.CREDENTIALS.PASSWORD) {
      // Store session in localStorage
      sessionStorage.setItem('auth_session', 'authenticated');
      sessionStorage.setItem('auth_timestamp', Date.now().toString());

    return {
      success: true,
        message: AUTH_CONFIG.SUCCESS_MESSAGES.LOGIN_SUCCESS,
      redirectUrl: AUTH_CONFIG.ROUTES.SERVICES
    };
    } else {
      return {
        success: false,
        message: AUTH_CONFIG.ERROR_MESSAGES.INVALID_PASSWORD
      };
    }
  } catch (err) {
    console.error('Error during authentication:', err);
    return {
      success: false,
      message: AUTH_CONFIG.ERROR_MESSAGES.GENERIC_ERROR
    };
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const session = sessionStorage.getItem('auth_session');
  const timestamp = sessionStorage.getItem('auth_timestamp');
  
  if (!session || !timestamp) return false;

  const sessionAge = Date.now() - parseInt(timestamp);
  const maxAge = AUTH_CONFIG.SECURITY.SESSION_DURATION * 1000;

  if (sessionAge > maxAge) {
    sessionStorage.removeItem('auth_session');
    sessionStorage.removeItem('auth_timestamp');
          return false;
        }

  return session === 'authenticated';
      }

// Logout function
export function logout(): void {
  sessionStorage.removeItem('auth_session');
  sessionStorage.removeItem('auth_timestamp');
} 