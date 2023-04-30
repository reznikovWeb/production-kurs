import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { DropDown } from 'shared/ui/Popups';

import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User';

import styles from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
   className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
   const authData = useSelector(getUserAuthData);
   const isAdmin = useSelector(isUserAdmin);
   const isManager = useSelector(isUserManager);

   const { t } = useTranslation();

   const dispatch = useDispatch();

   const onLogout = useCallback(() => {
      dispatch(userActions.logout());
   }, [dispatch]);

   const isAdminPanelAvailable = isAdmin || isManager;

   if (!authData) {
      return null;
   }

   return (
      <DropDown
         className={classNames(styles.AvatarDropdown, {}, [className])}
         direction="bottom left"
         items={[
            ...(isAdminPanelAvailable
               ? [{ content: t('Админка'), href: RoutePath.admin_panel }]
               : []),
            { content: t('Профиль'), href: RoutePath.profile + authData.id },
            { content: t('Выйти'), onClick: onLogout },
         ]}
         trigger={<Avatar size={30} src={authData.avatar} />}
      />
   );
});
