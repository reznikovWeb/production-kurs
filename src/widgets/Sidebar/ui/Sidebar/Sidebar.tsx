import React, { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, SizeButton, ThemeButton } from 'shared/ui/Button/Button';
import { VStack } from 'shared/ui/Stack/VStack/VStack';

import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import styles from './Sidebar.module.scss';

interface SidebarProps {
   className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
   const [collapsed, setCollapsed] = useState<boolean>(false);

   const sidebarItemList = useSelector(getSidebarItems);

   const onToggle = () => {
      setCollapsed((prev) => !prev);
   };

   const itemsList = useMemo(
      () =>
         sidebarItemList.map((item) => (
            <SidebarItem item={item} collapsed={collapsed} key={item.path} />
         )),
      [collapsed, sidebarItemList],
   );

   return (
      <menu
         data-testid="sidebar"
         className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [className])}
      >
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

         <VStack gap="8" className={styles.items}>
            {itemsList}
         </VStack>

         <div className={styles.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={styles.lang} short={collapsed} />
         </div>
      </menu>
   );
});
