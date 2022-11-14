import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileLoading } from '../../model/selectors/getProfileLoading/getProfileLoading';
import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
   className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
   const { t } = useTranslation();

   const data = useSelector(getProfileData);
   const error = useSelector(getProfileError);
   const isLoading = useSelector(getProfileLoading);

   return (
      <div className={classNames(styles.profileCard, {}, [className])}>
         <div className={styles.header}>
            <Text title={t('Профиль')} />
            <Button className={styles.editBtn} theme={ThemeButton.OUTLINE}>
               {t('Редактировать')}
            </Button>
         </div>
         <div className={styles.data}>
            <Input value={data?.first} placeholder={t('Ваше имя')} className={styles.input} />
            <Input value={data?.lastname} placeholder={t('Ваша фамилия')} className={styles.input} />
         </div>
      </div>
   );
};
