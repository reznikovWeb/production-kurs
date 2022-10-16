import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

import styles from './Navbar.module.scss';

interface NavbarProps {
   className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
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
         <div className={classNames(styles.Navbar, {}, [className])}>
            <Button
               theme={ThemeButton.CLEAR_INVERTED}
               className={styles.links}
               onClick={onLogout}
            >
               {t('Выйти')}
            </Button>
         </div>
      );
   }

   return (
      <div className={classNames(styles.Navbar, {}, [className])}>
         <Button
            theme={ThemeButton.CLEAR_INVERTED}
            className={styles.links}
            onClick={onShowModal}
         >
            {t('Войти')}
         </Button>

         <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      </div>
   );
};
