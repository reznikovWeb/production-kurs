import { LoginModal } from 'features/AuthByUsername';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';

import styles from './Navbar.module.scss';

interface NavbarProps {
   className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
   const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
   const { t } = useTranslation();

   const onCloseModal = useCallback(() => {
      setIsAuthModal(false);
   }, []);

   const onShowModal = useCallback(() => {
      setIsAuthModal(true);
   }, []);

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
