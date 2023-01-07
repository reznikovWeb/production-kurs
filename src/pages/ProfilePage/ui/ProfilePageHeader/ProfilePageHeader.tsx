import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';

import { getProfileData, getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile';
import { getUserAuthData } from 'entities/User';

import styles from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
   className?: string;
}

export const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({ className }) => {
   const { t } = useTranslation();

   const readonly = useSelector(getProfileReadonly);
   const authData = useSelector(getUserAuthData);
   const profileData = useSelector(getProfileData);
   const canEdit = authData?.id === profileData?.id;

   const dispatch = useAppDispatch();

   const onEdit = useCallback(() => {
      dispatch(profileActions.setReadonly(false));
   }, [dispatch]);

   const onCancelEdit = useCallback(() => {
      dispatch(profileActions.cancelEdit());
   }, [dispatch]);

   const onSave = useCallback(() => {
      dispatch(updateProfileData());
   }, [dispatch]);

   return (
      <div className={classNames(styles.profilePageHeader, {}, [className])}>
         <Text title={t('Профиль')} />
         {canEdit && (
            <div className={styles.btnsWrapper}>
               {readonly ? (
                  <Button className={styles.editBtn} theme={ThemeButton.OUTLINE} onClick={onEdit}>
                     {t('Редактировать')}
                  </Button>
               ) : (
                  <div>
                     <Button
                        className={styles.editBtn}
                        theme={ThemeButton.OUTLINE_RED}
                        onClick={onCancelEdit}
                     >
                        {t('Отменить')}
                     </Button>
                     <Button className={styles.editBtn} theme={ThemeButton.OUTLINE} onClick={onSave}>
                        {t('Сохранить')}
                     </Button>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};
