import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import styles from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => (
   <div className={classNames(styles.Navbar, {}, [className])}>

      <div className={styles.links}>
         <AppLink
            className={styles.mainLink}
            theme={AppLinkTheme.SECONDARY}
            to="/"
         >
            Главная
         </AppLink>
         <AppLink theme={AppLinkTheme.SECONDARY} to="/about">
            О сайте
         </AppLink>
      </div>
   </div>
);
