import { Listbox as HListbox } from '@headlessui/react';
import React, { Fragment, ReactNode, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';

import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import styles from './ListBox.module.scss';

export interface ListBoxItem {
   value: string;
   content: ReactNode;
   disabled?: boolean;
}

type DropDownDirection = 'top' | 'bottom';

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

const mapDirectionClass: Record<DropDownDirection, string> = {
   bottom: styles.optionBottom,
   top: styles.optionTop,
};

export const ListBox = memo((props: ListBoxProps) => {
   const {
      className,
      items,
      value,
      defaultValue,
      onChange,
      readonly,
      direction = 'bottom',
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
            className={classNames(styles.ListBox, {}, [className])}
         >
            <HListbox.Button disabled={readonly} className={styles.trigger}>
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
                              [styles.active]: active,
                              [styles.selected]: selected,
                              [styles.disabled]: item.disabled,
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
