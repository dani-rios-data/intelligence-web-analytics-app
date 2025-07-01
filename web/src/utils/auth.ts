// Simple Password Authentication Configuration
export const AUTH_CONFIG = {
  // Static credentials for simple authentication
  CREDENTIALS: {
    PASSWORD: 'TBWAIntelligence2025!',
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
    EMPTY_FIELDS: 'Ready to disrupt? Your access code awaits.',
    INVALID_PASSWORD: 'Almost there! Let\'s try that again.',
    NETWORK_ERROR: 'The connection stumbled, but innovation never stops. Try again?',
    RATE_LIMIT_EXCEEDED: 'Even disruptors need a breather. Take five and come back stronger.',
    GENERIC_ERROR: 'Something unexpected happened, but breakthroughs often do. Let\'s try again.',
    SESSION_EXPIRED: 'Your session wrapped up, but your next breakthrough is just a sign-in away.',
  },
  SUCCESS_MESSAGES: {
    LOGIN_SUCCESS: 'Brilliant! You\'re onto something big.',
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
  console.log('🔑 [Auth] isAuthenticated() called');
  
  if (typeof window === 'undefined') {
    console.log('🔑 [Auth] Window undefined - returning false');
    return false;
  }
  
  const session = sessionStorage.getItem('auth_session');
  const timestamp = sessionStorage.getItem('auth_timestamp');
  
  console.log('🔑 [Auth] Session check:', {
    session,
    timestamp,
    sessionExists: !!session,
    timestampExists: !!timestamp
  });
  
  if (!session || !timestamp) {
    console.log('🔑 [Auth] No session or timestamp found - returning false');
    return false;
  }
  
  const sessionAge = Date.now() - parseInt(timestamp);
  const maxAge = AUTH_CONFIG.SECURITY.SESSION_DURATION * 1000;
  
  console.log('🔑 [Auth] Session age check:', {
    currentTime: Date.now(),
    sessionTimestamp: parseInt(timestamp),
    sessionAge,
    maxAge,
    isExpired: sessionAge > maxAge,
    sessionAgeMinutes: Math.round(sessionAge / 1000 / 60),
    maxAgeMinutes: Math.round(maxAge / 1000 / 60)
  });
  
  if (sessionAge > maxAge) {
    console.log('🔑 [Auth] Session expired - cleaning up and returning false');
    sessionStorage.removeItem('auth_session');
    sessionStorage.removeItem('auth_timestamp');
    return false;
  }
  
  const isAuth = session === 'authenticated';
  console.log('🔑 [Auth] Final auth check:', {
    session,
    expected: 'authenticated',
    isAuthenticated: isAuth
  });
  
  return isAuth;
}

// Logout function
export function logout(): void {
  sessionStorage.removeItem('auth_session');
  sessionStorage.removeItem('auth_timestamp');
} 