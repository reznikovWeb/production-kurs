import React, { ChangeEvent, memo, useMemo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';

import styles from './Select.module.scss';

export interface SelectOption {
   value: string;
   content: string;
}

interface SelectProps {
   className?: string;
   label?: string;
   options?: SelectOption[];
   value?: string;
   onChange?: (value: string) => void;
   readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
   const { className, label, options, value, onChange, readonly } = props;

   const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event.target.value);
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
});
