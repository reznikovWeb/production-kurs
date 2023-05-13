import React, { memo, useCallback } from 'react';

import CopyIcon from '@/shared/assets/icons/copy.svg';

import { classNames } from '../../lib/classNames/classNames';
import { Button, ThemeButton } from '../Button/Button';
import styles from './Code.module.scss';

interface CodeProps {
   className?: string;
   text: string;
}

export const Code = memo(({ className, text }: CodeProps) => {
   const onCopy = useCallback(() => {
      navigator.clipboard.writeText(text);
   }, [text]);

   return (
      <pre className={classNames(styles.Code, {}, [className])}>
         <Button onClick={onCopy} className={styles.copyBtn} theme={ThemeButton.CLEAR}>
            <CopyIcon className={styles.copyIcon} />
         </Button>
         <code>{text}</code>
      </pre>
   );
});
