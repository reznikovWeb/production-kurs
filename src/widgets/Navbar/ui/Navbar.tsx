import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/notificationButton';

import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text/Text';

import { getUserAuthData } from '@/entities/User';

import styles from './Navbar.module.scss';

interface NavbarProps {
   className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
   const [isAuthModal, setIsAuthModal] = useState<boolean>(false);

   const authData = useSelector(getUserAuthData);

   const { t } = useTranslation();

   const onCloseModal = useCallback(() => {
      setIsAuthModal(false);
   }, []);

   const onShowModal = useCallback(() => {
      setIsAuthModal(true);
   }, []);

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
            <HStack gap="16" className={styles.actions}>
               <NotificationButton />
               <AvatarDropdown />
            </HStack>
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
