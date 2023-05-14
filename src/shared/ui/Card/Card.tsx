import React, { HTMLAttributes, ReactNode, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Card.module.scss';

export enum CardTheme {
   NORMAL = 'normal',
   OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
   className?: string;
   children: ReactNode;
   theme?: CardTheme;
   max?: boolean;
}

export const Card = memo(
   ({ className, children, theme = CardTheme.NORMAL, max, ...otherProps }: CardProps) => {
      return (
         <div
            className={classNames(styles.Card, { [styles.max]: max }, [className, styles[theme]])}
            {...otherProps}
         >
            {children}
         </div>
      );
   },
);
