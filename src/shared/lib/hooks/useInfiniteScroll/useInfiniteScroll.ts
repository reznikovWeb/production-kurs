import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
   callback?: () => void;
   triggerRef: MutableRefObject<HTMLElement>;
   wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({ callback, triggerRef, wrapperRef }: UseInfiniteScrollOptions) {
   const observer = useRef<IntersectionObserver | null>(null);

   useEffect(() => {
      const wrapperElement = wrapperRef.current;
      const triggerElement = triggerRef.current;

      if (callback && wrapperElement) {
         const options = {
            // В root элемент в котором находится скрол
            root: wrapperElement,
            rootMargin: '0px',
            threshold: 1.0,
         };

         observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
               callback();
            }
         }, options);

         observer.current.observe(triggerRef.current);
      }

      return () => {
         if (observer.current && triggerElement) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.current.unobserve(triggerElement);
         }
      };
   }, [callback, triggerRef, wrapperRef]);
}
