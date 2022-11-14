import React, { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal/Portal';

import styles from './Modal.module.scss';

interface ModalProps {
   className?: string;
   children?: ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
   lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal: React.FC<ModalProps> = ({ className, children, isOpen, onClose, lazy }) => {
   const [isClosing, setIsClosing] = useState<boolean>(false);
   const [isMounted, setIsMounted] = useState<boolean>(false);

   const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

   const mods: Mods = {
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

   // Lazy loading
   useEffect(() => {
      if (isOpen) {
         setIsMounted(true);
      }
   }, [isOpen]);

   if (lazy && !isMounted) {
      return null;
   }

   return (
      <Portal>
         <div className={classNames(styles.modal, mods, [className])}>
            <div className={styles.overlay} onClick={onCloseHandler}>
               <div className={classNames(styles.content)} onClick={onContentClick}>
                  {children}
               </div>
            </div>
         </div>
      </Portal>
   );
};
