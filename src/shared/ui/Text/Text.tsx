import React, { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import styles from './Text.module.scss';

export enum TextTheme {
   PRIMARY = 'primary',
   ERROR = 'error',
}

interface TextProps {
   className?: string;
   title?: string;
   text?: string;
   theme?: TextTheme;
}

export const Text = memo(({ className, title, text, theme = TextTheme.PRIMARY }: TextProps) => {
   return (
      <div className={classNames(styles.text, {}, [className, styles[theme]])}>
         {title && <p className={styles.title}>{title}</p>}
         {text && <p className={styles.text}>{text}</p>}
      </div>
   );
});
