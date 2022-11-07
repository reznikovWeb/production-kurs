import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, SizeButton, ThemeButton } from 'shared/ui/Button/Button';

import { LangSwitcher } from 'widgets/LangSwitcher';
import { SidebarItemList } from 'widgets/Sidebar/model/items';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import styles from './Sidebar.module.scss';

interface SidebarProps {
   className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
   const [collapsed, setCollapsed] = useState<boolean>(false);

   const onToggle = () => {
      setCollapsed((prev) => !prev);
   };

   return (
      <div data-testid="sidebar" className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [className])}>
         <Button
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={styles.collapsedBtn}
            theme={ThemeButton.BACKGROUND_INVERTED}
            size={SizeButton.L}
            square
         >
            {collapsed ? '>' : '<'}
         </Button>

         <div className={styles.items}>
            {SidebarItemList.map((item) => (
               <SidebarItem item={item} collapsed={collapsed} key={item.path} />
            ))}
         </div>

         <div className={styles.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={styles.lang} short={collapsed} />
         </div>
      </div>
   );
});
