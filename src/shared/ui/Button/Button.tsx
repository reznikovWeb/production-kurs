import React, { ButtonHTMLAttributes, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import styles from './Button.module.scss';

export enum ThemeButton {
   CLEAR = 'clear',
   CLEAR_INVERTED = 'clearInverted',
   OUTLINE = 'outline',
   BACKGROUND = 'background',
   BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum SizeButton {
   M = 'size_m',
   L = 'size_l',
   XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   theme?: ThemeButton;
   square?: boolean;
   size?: SizeButton;
   disabled?: boolean;
}

export const Button = memo(
   ({ className, children, theme, square, disabled, size = SizeButton.M, ...otherProps }: ButtonProps) => {
      const mods: Record<string, boolean> = {
         [styles.square]: square,
         [styles.disabled]: disabled,
      };
      return (
         <button
            type="button"
            className={classNames(styles.button, mods, [className, styles[theme], styles[size]])}
            disabled={disabled}
            {...otherProps}
         >
            {children}
         </button>
      );
   },
);
