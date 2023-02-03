import React, { ChangeEvent, useMemo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';

import styles from './Select.module.scss';

export interface SelectOption<T extends string> {
   value: T;
   content: string;
}

interface SelectProps<T extends string> {
   className?: string;
   label?: string;
   options?: SelectOption<T>[];
   value?: T;
   onChange?: (value: T) => void;
   readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
   const { className, label, options, value, onChange, readonly } = props;

   const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event.target.value as T);
   };

   const optionsList = useMemo(() => {
      return options?.map((opt) => (
         <option value={opt.value} className={styles.option} key={opt.value}>
            {opt.content}
         </option>
      ));
   }, [options]);

   const mods: Mods = {};

   return (
      <div className={classNames(styles.wrapper, mods, [className])}>
         {label && <span className={styles.label}>{label}</span>}
         <select disabled={readonly} value={value} className={styles.select} onChange={onChangeHandler}>
            {optionsList}
         </select>
      </div>
   );
};
