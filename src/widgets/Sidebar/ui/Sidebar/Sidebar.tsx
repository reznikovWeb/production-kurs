import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import styles from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
   const [collapsed, setCollapsed] = useState<boolean>(false);

   const { t } = useTranslation();

   const onToggle = () => {
      setCollapsed((prev) => !prev);
   };

   return (
      <div
         data-testid="sidebar"
         className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [
            className,
         ])}
      >
         <Button
            data-testid="sidebar-toggle"
            onClick={onToggle}
         >
            {t('Переключить')}
         </Button>
         <div className={styles.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={styles.lang} />
         </div>
      </div>
   );
};
