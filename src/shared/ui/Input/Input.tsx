import React, { InputHTMLAttributes, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import styles from './Input.module.scss';

type HTMLInputProps = Omit<
   InputHTMLAttributes<HTMLInputElement>,
   'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
   className?: string;
   value?: string;
   onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
   const {
      className,
      value,
      onChange,
      type = 'text',
      placeholder,
      ...otherProps
   } = props;

   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
   };

   return (
      <div className={classNames(styles.inputWrapper, {}, [className])}>
         {placeholder && (
            <div className={styles.placeholder}>{`${placeholder}>`}</div>
         )}
         <input
            className={styles.input}
            type={type}
            value={value}
            onChange={onChangeHandler}
            {...otherProps}
         />
      </div>
   );
});
