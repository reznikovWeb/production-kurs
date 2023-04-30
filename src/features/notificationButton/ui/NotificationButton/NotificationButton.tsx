import React, { memo } from 'react';

import NotificationIcon from 'shared/assets/icons/bell.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';

import { NotificationList } from 'entities/Notification';

import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
   className?: string;
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
   return (
      <Popover
         className={classNames(styles.NotificationButton, {}, [className])}
         direction="bottom left"
         trigger={
            <Button theme={ThemeButton.CLEAR}>
               <Icon Svg={NotificationIcon} inverted />
            </Button>
         }
      >
         <NotificationList className={styles.notifications} />
      </Popover>
   );
});
