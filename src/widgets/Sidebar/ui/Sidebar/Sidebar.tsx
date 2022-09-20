import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button } from 'shared/ui/Button/Button';
import styles from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
   const [collapsed, setCollapsed] = useState<boolean>(false);

   const onToggle = () => {
      setCollapsed((prev) => !prev);
   };

   return (
      <div
         className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [
            className,
         ])}
      >
         <Button onClick={onToggle}>toggle</Button>
         <div className={styles.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={styles.lang} />
         </div>
      </div>
   );
};
