// Позволяет выполнить только одно событие в промежуток времени
// Например можно сохраняться позицию скролла раз в секунду
import { useCallback, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
   const throttleRef = useRef(false);

   return useCallback(
      (...args: any[]) => {
         if (!throttleRef.current) {
            callback(...args);
            throttleRef.current = true;

            setTimeout(() => {
               throttleRef.current = false;
            }, delay);
         }
      },
      [callback, delay],
   );
}
