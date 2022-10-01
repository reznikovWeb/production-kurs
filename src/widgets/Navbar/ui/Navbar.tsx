import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.scss";
import { Loader } from "shared/ui/Loader/Loader";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(styles.Navbar, {}, [className])}>
      <div className={styles.links}>
        <AppLink
          className={styles.mainLink}
          theme={AppLinkTheme.SECONDARY}
          to="/"
        >
          {t("Главная")}
        </AppLink>
        <AppLink theme={AppLinkTheme.RED} to="/about">
          {t("О сайте")}
        </AppLink>
      </div>
    </div>
  );
};
