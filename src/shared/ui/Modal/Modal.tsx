import { useTheme } from 'app/providers/ThemeProvider';
import React, {
   ReactNode,
   useCallback,
   useEffect,
   useRef,
   useState,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal/Portal';

import styles from './Modal.module.scss';

interface ModalProps {
   className?: string;
   children?: ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal: React.FC<ModalProps> = ({
   className,
   children,
   isOpen,
   onClose,
}) => {
   const [isClosing, setIsClosing] = useState<boolean>(false);

   const timerRef = useRef<ReturnType<typeof setTimeout>>();

   const { theme } = useTheme();

   const mods: Record<string, boolean> = {
      [styles.opened]: isOpen,
      [styles.isClosing]: isClosing,
   };

   const onCloseHandler = useCallback(() => {
      if (onClose) {
         setIsClosing(true);
         timerRef.current = setTimeout(() => {
            onClose();
            setIsClosing(false);
         }, ANIMATION_DELAY);
      }
   }, [onClose]);

   const onContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
   };

   const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
         if (e.key === 'Escape') {
            onCloseHandler();
         }
      },
      [onCloseHandler],
   );

   useEffect(() => {
      if (isOpen) {
         window.addEventListener('keydown', onKeyDown);
      }
      return () => {
         clearInterval(timerRef.current);
         window.removeEventListener('keydown', onKeyDown);
      };
   }, [isOpen, onKeyDown]);

   return (
      <Portal>
         <div className={classNames(styles.modal, mods, [className])}>
            <div className={styles.overlay} onClick={onCloseHandler}>
               <div
                  className={classNames(styles.content)}
                  onClick={onContentClick}
               >
                  {children}
               </div>
            </div>
         </div>
      </Portal>
   );
};
