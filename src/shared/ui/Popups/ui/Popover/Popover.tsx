import { Popover as HPopover } from '@headlessui/react';
import React, { ReactNode, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';

import { mapDirectionClass } from '../../styles/consts';
import popupStyles from '../../styles/popup.module.scss';
import styles from './Popover.module.scss';

interface PopoverProps {
   className?: string;
   trigger?: ReactNode;
   direction?: DropDownDirection;
   children: ReactNode;
}

export const Popover = memo((props: PopoverProps) => {
   const { className, direction = 'bottom right', trigger, children } = props;

   const menuClasses: string[] = [mapDirectionClass[direction]];

   return (
      <HPopover className={classNames(styles.Popover, {}, [className, popupStyles.popup])}>
         <HPopover.Button className={popupStyles.trigger}>{trigger}</HPopover.Button>

         <HPopover.Panel className={classNames(styles.panel, {}, menuClasses)}>
            {children}
         </HPopover.Panel>
      </HPopover>
   );
});
