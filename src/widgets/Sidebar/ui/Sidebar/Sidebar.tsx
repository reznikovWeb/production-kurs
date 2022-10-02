import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button, SizeButton, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/main.svg';
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
            className={styles.collapsedBtn}
            theme={ThemeButton.BACKGROUND_INVERTED}
            size={SizeButton.L}
            square
         >
            {collapsed ? '>' : '<'}
         </Button>

         <div className={styles.items}>
            <AppLink
               theme={AppLinkTheme.SECONDARY}
               to={RoutePath.main}
               className={styles.item}
            >
               <MainIcon className={styles.icon} />
               <span className={styles.link}>
                  {t('Главная')}
               </span>

            </AppLink>
            <AppLink
               theme={AppLinkTheme.RED}
               to={RoutePath.about}
               className={styles.item}
            >
               <AboutIcon className={styles.icon} />
               <span className={styles.link}>
                  {t('О сайте')}
               </span>
            </AppLink>
         </div>

         <div className={styles.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={styles.lang} short={collapsed} />
         </div>
      </div>
   );
};
