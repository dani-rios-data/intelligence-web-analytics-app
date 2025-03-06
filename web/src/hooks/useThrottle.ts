import { useCallback, useRef } from 'react';

type AnyFunction = (...args: any[]) => any;

export function useThrottle<T extends AnyFunction>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args) => {
      const now = Date.now();

      if (lastCall.current && now - lastCall.current < delay) {
        // Si ya hay un timeout pendiente, no hacemos nada
        if (timeoutRef.current) return;

        // Programamos la siguiente ejecución
        timeoutRef.current = setTimeout(() => {
          lastCall.current = Date.now();
          callback(...args);
          timeoutRef.current = undefined;
        }, delay - (now - lastCall.current));

        return;
      }

      // Primera llamada o después del delay
      lastCall.current = now;
      callback(...args);
    }) as T,
    [callback, delay]
  );
} 