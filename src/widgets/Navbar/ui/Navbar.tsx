import { LoginModal } from 'features/AuthByUsername';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text, TextTheme } from 'shared/ui/Text/Text';

import { getUserAuthData, userActions } from 'entities/User';

import styles from './Navbar.module.scss';

interface NavbarProps {
   className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
   const [isAuthModal, setIsAuthModal] = useState<boolean>(false);

   const authData = useSelector(getUserAuthData);

   const dispatch = useDispatch();
   const { t } = useTranslation();

   const onCloseModal = useCallback(() => {
      setIsAuthModal(false);
   }, []);

   const onShowModal = useCallback(() => {
      setIsAuthModal(true);
   }, []);

   const onLogout = useCallback(() => {
      dispatch(userActions.logout());
   }, [dispatch]);

   if (authData) {
      return (
         <header className={classNames(styles.Navbar, {}, [className])}>
            <Text className={styles.appName} title={t('Заголовок')} theme={TextTheme.INVERTED} />
            <AppLink
               to={RoutePath.article_create}
               theme={AppLinkTheme.SECONDARY}
               className={styles.createBtn}
            >
               {t('Создать статью')}
            </AppLink>
            <Button theme={ThemeButton.CLEAR_INVERTED} className={styles.links} onClick={onLogout}>
               {t('Выйти')}
            </Button>
         </header>
      );
   }

   return (
      <header className={classNames(styles.Navbar, {}, [className])}>
         <Button theme={ThemeButton.CLEAR_INVERTED} className={styles.links} onClick={onShowModal}>
            {t('Войти')}
         </Button>

         {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
      </header>
   );
});
