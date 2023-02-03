import React, { ReactNode, memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Card, CardTheme } from 'shared/ui/Card/Card';

import styles from './Tabs.module.scss';

export interface TabItem {
   value: string;
   content: ReactNode;
}

interface TabsProps {
   className?: string;
   tabs: TabItem[];
   value: string;
   onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo((props: TabsProps) => {
   const { className, onTabClick, tabs, value } = props;

   const clickHandle = useCallback(
      (tab: TabItem) => {
         return () => {
            onTabClick(tab);
         };
      },
      [onTabClick],
   );

   return (
      <div className={classNames(styles.Tabs, {}, [className])}>
         {tabs.map((tab) => (
            <Card
               className={styles.tab}
               key={tab.value}
               theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
               onClick={clickHandle(tab)}
            >
               {tab.content}
            </Card>
         ))}
      </div>
   );
});
