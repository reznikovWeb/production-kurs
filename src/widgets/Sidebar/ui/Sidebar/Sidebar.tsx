import React, { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, SizeButton, ThemeButton } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

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
      <aside
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

         <VStack gap="12" className={styles.items}>
            {itemsList}
         </VStack>

         <div className={styles.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={styles.lang} short={collapsed} />
         </div>
      </aside>
   );
});
