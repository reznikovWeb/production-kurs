import React, { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import NotificationIcon from '@/shared/assets/icons/bell.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popups';

import { NotificationList } from '@/entities/Notification';

import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
   className?: string;
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
   const [isOpen, setIsOpen] = useState(false);

   const onOpenDrawer = useCallback(() => {
      setIsOpen(true);
   }, [setIsOpen]);

   const onCloseDrawer = useCallback(() => {
      setIsOpen(false);
   }, [setIsOpen]);

   const trigger = (
      <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
         <Icon Svg={NotificationIcon} inverted />
      </Button>
   );

   return (
      <div>
         <BrowserView>
            <Popover
               className={classNames(styles.NotificationButton, {}, [className])}
               direction="bottom left"
               trigger={trigger}
            >
               <NotificationList className={styles.notifications} />
            </Popover>
         </BrowserView>
         <MobileView>
            {trigger}

            <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
               <NotificationList />
            </Drawer>
         </MobileView>
      </div>
   );
});
