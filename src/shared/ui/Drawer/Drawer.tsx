import { useTheme } from 'app/providers/ThemeProvider';
import React, { ReactNode, memo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import styles from './Drawer.module.scss';

interface DrawerProps {
   className?: string;
   children: ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
   const { children, className, onClose, isOpen } = props;

   const { theme } = useTheme();

   const mods: Mods = {
      [styles.opened]: isOpen,
   };

   return (
      <Portal>
         <div className={classNames(styles.Drawer, mods, [className, theme, 'app_drawer'])}>
            <Overlay onClick={onClose} />
            <div className={styles.content}>{children}</div>
         </div>
      </Portal>
   );
});
