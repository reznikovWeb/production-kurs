import React, { ReactNode, memo, useCallback, useEffect } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/components/AnimationProvider';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import styles from './Drawer.module.scss';

interface DrawerProps {
   className?: string;
   children: ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
   lazy?: boolean;
}

const height = window.innerHeight - 100;

export const DrawerContent = memo((props: DrawerProps) => {
   const { className, children, onClose, isOpen, lazy } = props;
   const { Spring, Gesture } = useAnimationLibs();
   const { theme } = useTheme();

   const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

   const openDrawer = useCallback(() => {
      api.start({ y: 0, immediate: false });
   }, [api]);

   const close = (velocity = 0) => {
      api.start({
         y: height,
         immediate: false,
         config: { ...Spring.config.stiff, velocity },
         onResolve: onClose,
      });
   };

   const bind = Gesture.useDrag(
      ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
         if (my < -70) cancel();

         if (last) {
            if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
               close();
            } else {
               openDrawer();
            }
         } else {
            api.start({ y: my, immediate: true });
         }
      },
      {
         from: () => [0, y.get()],
         filterTaps: true,
         bounds: { top: 0 },
         rubberband: true,
      },
   );

   const display = y.to((py) => (py < height ? 'block' : 'none'));

   useEffect(() => {
      if (isOpen) {
         openDrawer();
      }
   }, [api, isOpen, openDrawer]);

   if (!isOpen) {
      return null;
   }

   return (
      <Portal>
         <div className={classNames(styles.Drawer, {}, [className, theme, 'app_drawer'])}>
            <Overlay onClick={close} />
            <Spring.a.div
               className={styles.sheet}
               style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
               {...bind()}
            >
               {children}
            </Spring.a.div>
         </div>
      </Portal>
   );
});

const DrawerAsync = (props: DrawerProps) => {
   const { isLoaded } = useAnimationLibs();

   if (!isLoaded) {
      return null;
   }

   return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => {
   return (
      <AnimationProvider>
         <DrawerAsync {...props} />
      </AnimationProvider>
   );
};
