import { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
   Gesture?: GestureType;
   Spring?: SpringType;
   isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

// Обе либы зависят друг от друга
const getAsyncAnimationModules = () => {
   return Promise.all([import('@react-spring/web'), import('@use-gesture/react')]);
};

// Хук, чтобы удобнее работать
export const useAnimationLibs = () => {
   return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
   const [isLoaded, setIsLoaded] = useState(false);

   const SpringRef = useRef<SpringType>();
   const GestureRef = useRef<GestureType>();

   const value = useMemo(
      () => ({ Gesture: GestureRef.current, Spring: SpringRef.current, isLoaded }),
      [isLoaded],
   );

   useEffect(() => {
      getAsyncAnimationModules().then(([Spring, Gesture]) => {
         SpringRef.current = Spring;
         GestureRef.current = Gesture;
         setIsLoaded(true);
      });
   }, []);

   return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};
