import React, { ButtonHTMLAttributes } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Button.module.scss';

export enum ThemeButton {
   CLEAR = 'clear',
   OUTLINE = 'outline',
   BACKGROUND = 'background',
   BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum SizeButton{
   M = 'size_m',
   L = 'size_l',
   XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   theme?: ThemeButton;
   square?:boolean;
   size?:SizeButton
}

export const Button: React.FC<ButtonProps> = ({
   className,
   children,
   theme,
   square,
   size = SizeButton.M,
   ...otherProps
}) => {
   const mods:Record<string, boolean> = {
      [styles.square]: square,
   };
   return (
      <button
         type="button"
         className={classNames(
            styles.button,
            mods,
            [className, styles[theme], styles[size]],
         )}
         {...otherProps}
      >
         {children}
      </button>
   );
};
