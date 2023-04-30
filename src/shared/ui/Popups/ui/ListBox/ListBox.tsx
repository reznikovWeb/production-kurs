import { Listbox as HListbox } from '@headlessui/react';
import React, { Fragment, ReactNode, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { DropDownDirection } from '../../../../types/ui';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupStyles from '../../styles/popup.module.scss';
import styles from './ListBox.module.scss';

export interface ListBoxItem {
   value: string;
   content: ReactNode;
   disabled?: boolean;
}

interface ListBoxProps {
   className?: string;
   items?: ListBoxItem[];
   value?: string;
   defaultValue?: string;
   onChange: <T extends string>(value: T) => void;
   readonly?: boolean;
   direction?: DropDownDirection;
   label?: string;
}

export const ListBox = memo((props: ListBoxProps) => {
   const {
      className,
      items,
      value,
      defaultValue,
      onChange,
      readonly,
      direction = 'bottom left',
      label,
   } = props;

   const optionsClasses: string[] = [mapDirectionClass[direction]];

   return (
      <HStack gap="4">
         {label && <span>{label}</span>}
         <HListbox
            disabled={readonly}
            as="div"
            value={value}
            onChange={onChange}
            className={classNames('', {}, [className, popupStyles.popup])}
         >
            <HListbox.Button as="div" className={styles.trigger}>
               <Button disabled={readonly}>{value ?? defaultValue}</Button>
            </HListbox.Button>
            <HListbox.Options className={classNames(styles.options, {}, optionsClasses)}>
               {items?.map((item) => (
                  <HListbox.Option
                     key={item.value}
                     value={item.value}
                     disabled={item.disabled}
                     as={Fragment}
                  >
                     {({ active, selected }) => (
                        <li
                           className={classNames(styles.item, {
                              [popupStyles.active]: active,
                              [styles.selected]: selected,
                              [popupStyles.disabled]: item.disabled,
                           })}
                        >
                           {item.content}
                        </li>
                     )}
                  </HListbox.Option>
               ))}
            </HListbox.Options>
         </HListbox>
      </HStack>
   );
});
