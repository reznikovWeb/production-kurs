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

   const onToggleModal = useCallback(() => {
      setIsAuthModal((prev) => !prev);
   }, []);
   return (
      <div className={classNames(styles.Navbar, {}, [className])}>
         <Button
            theme={ThemeButton.CLEAR_INVERTED}
            className={styles.links}
            onClick={onToggleModal}
         >
            {t('Войтии')}
         </Button>

         {/* eslint-disable-next-line i18next/no-literal-string */}
         <Modal isOpen={isAuthModal} onClose={onToggleModal}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur eaque earum eius
            enim error facilis id iure, laboriosam modi nesciunt officiis omnis, quae quam quidem,
            rem sed tempore voluptate voluptatem!
         </Modal>
      </div>
   );
};
