import React, { InputHTMLAttributes, memo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';

import styles from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
   className?: string;
   value?: string | number;
   onChange?: (value: string) => void;
   readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
   const { className, value, onChange, type = 'text', placeholder, readonly, ...otherProps } = props;

   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
   };

   const mods: Mods = {
      [styles.readonly]: readonly,
   };

   return (
      <div className={classNames(styles.inputWrapper, {}, [className])}>
         {placeholder && <div className={styles.placeholder}>{`${placeholder}>`}</div>}
         <input
            className={styles.input}
            type={type}
            value={value}
            onChange={onChangeHandler}
            readOnly={readonly}
            {...otherProps}
         />
      </div>
   );
});
