/**
 * Configuración centralizada de la aplicación
 * Aquí se definen todas las constantes y configuraciones globales
 */

// Información de la aplicación
export const APP_NAME = 'TBWA Intelligence Platform';
export const APP_DESCRIPTION = 'Plataforma de análisis e inteligencia para marketing digital';
export const APP_VERSION = '1.0.0';

// Configuración de rutas
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SERVICES: '/services',
  DATA_SOURCES: '/services/data-sources',
  INTELLIGENCE: '/services/intelligence',
  HELP: '/help',
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY: '/verify',
  },
  API: {
    AUTH: '/api/auth',
    SERVICES: '/api/services',
    USERS: '/api/users',
  },
};

// Configuración de tema
export const THEME = {
  colors: {
    primary: '#3B82F6',
    yellow: '#FACC15',
    dark: '#000000',
    darkMedium: '#0C1220',
    darkLight: '#0F1729',
    white: '#FFFFFF',
    gray: {
      100: 'rgba(255, 255, 255, 0.1)',
      200: 'rgba(255, 255, 255, 0.2)',
      300: 'rgba(255, 255, 255, 0.3)',
      400: 'rgba(255, 255, 255, 0.4)',
      500: 'rgba(255, 255, 255, 0.5)',
      600: 'rgba(255, 255, 255, 0.6)',
      700: 'rgba(255, 255, 255, 0.7)',
      800: 'rgba(255, 255, 255, 0.8)',
      900: 'rgba(255, 255, 255, 0.9)',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transition: {
    speed: '0.3s',
  },
  border: {
    radius: '8px',
  },
};

// Configuración de servicios externos
export const EXTERNAL_SERVICES = {
  SENTIMENT_API: 'http://34.41.106.124',
};

// Tiempo de expiración de sesión (en segundos)
export const SESSION_EXPIRY = 60 * 60 * 24 * 7; // 1 semana

// Configuración de paginación
export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
}; 