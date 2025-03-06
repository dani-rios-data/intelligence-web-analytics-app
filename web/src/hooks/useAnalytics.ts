import { useCallback } from 'react';

type AnalyticsEvent = {
  name: string;
  data?: Record<string, any>;
};

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, eventData?: Record<string, any>) => {
    try {
      // Aquí puedes integrar tu sistema de analytics preferido
      // Por ejemplo: Google Analytics, Mixpanel, etc.
      console.log('Analytics Event:', { eventName, eventData });
      
      // Ejemplo de implementación con Google Analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', eventName, eventData);
      }
    } catch (error) {
      // Silently fail in production, log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Analytics Error:', error);
      }
    }
  }, []);

  return { trackEvent };
} 