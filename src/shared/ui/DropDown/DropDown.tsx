import { Menu } from '@headlessui/react';
import React, { Fragment, ReactNode, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from 'shared/types/ui';

import { AppLink } from '../AppLink/AppLink';
import styles from './DropDown.module.scss';

export interface DropDownItem {
   disabled?: boolean;
   content?: ReactNode;
   onClick?: () => void;
   href?: string;
}

interface DropDownProps {
   className?: string;
   items: DropDownItem[];
   trigger?: ReactNode;
   direction?: DropDownDirection;
}

const mapDirectionClass: Record<DropDownDirection, string> = {
   'bottom left': styles.optionBottomLeft,
   'bottom right': styles.optionBottomRight,
   'top right': styles.optionTopRight,
   'top left': styles.optionTopLeft,
};

export const DropDown = memo((props: DropDownProps) => {
   const { className, trigger, items, direction = 'bottom right' } = props;

   const menuClasses: string[] = [mapDirectionClass[direction]];

   return (
      <Menu as="div" className={classNames(styles.DropDown, {}, [className])}>
         <Menu.Button className={styles.btn}>{trigger}</Menu.Button>
         <Menu.Items className={classNames(styles.menu, {}, menuClasses)}>
            {items.map((item, index) => {
               const content = ({ active }: { active: boolean }) => (
                  <button
                     key={index}
                     type="button"
                     disabled={item.disabled}
                     onClick={item.onClick}
                     className={classNames(styles.item, { [styles.active]: active }, [])}
                  >
                     {item.content}
                  </button>
               );

               if (item.href) {
                  return (
                     <Menu.Item key={index} as={AppLink} to={item.href} refName="href">
                        {content}
                     </Menu.Item>
                  );
               }

               return (
                  <Menu.Item key={index} as={Fragment}>
                     {content}
                  </Menu.Item>
               );
            })}
         </Menu.Items>
      </Menu>
   );
});
