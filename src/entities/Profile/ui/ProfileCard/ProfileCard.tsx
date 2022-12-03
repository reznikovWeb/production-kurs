import React from 'react';
import { useTranslation } from 'react-i18next';

import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';

import { Country, CountrySelect } from 'entities/Country';
import { Currency, CurrencySelect } from 'entities/Currency';

import { Profile } from '../../model/types/profile';
import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
   className?: string;
   data?: Profile;
   error?: string;
   isLoading?: boolean;
   readonly?: boolean;
   onChangeFirstname?: (value?: string) => void;
   onChangeLastname?: (value?: string) => void;
   onChangeCity?: (value?: string) => void;
   onChangeAge?: (value?: string) => void;
   onChangeAvatar?: (value?: string) => void;
   onChangeUsername?: (value?: string) => void;
   onChangeCurrency?: (currency: Currency) => void;
   onChangeCountry?: (country: Country) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
   className,
   data,
   error,
   isLoading,
   readonly,
   onChangeFirstname,
   onChangeLastname,
   onChangeCity,
   onChangeAge,
   onChangeAvatar,
   onChangeUsername,
   onChangeCurrency,
   onChangeCountry,
}) => {
   const { t } = useTranslation();

   if (isLoading) {
      return (
         <div className={classNames(styles.profileCard, { [styles.loading]: true }, [className])}>
            <Loader />
         </div>
      );
   }

   if (error) {
      return (
         <div className={classNames(styles.profileCard, {}, [className, styles.error])}>
            <Text
               theme={TextTheme.ERROR}
               title={t('Произошла ошибка при загрузке профиля')}
               text={t('Попробуйте обновить страницу')}
               align={TextAlign.CENTER}
            />
         </div>
      );
   }

   const mods: Mods = {
      [styles.editing]: !readonly,
   };

   return (
      <div className={classNames(styles.profileCard, mods, [className])}>
         <div className={styles.data}>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {data?.avatar && (
               <div className={styles.avatarWrapper}>
                  <Avatar src={data?.avatar} />
               </div>
            )}

            <Input
               onChange={onChangeFirstname}
               value={data?.first}
               placeholder={t('Ваше имя')}
               className={styles.input}
               readonly={readonly}
            />
            <Input
               onChange={onChangeLastname}
               value={data?.lastname}
               placeholder={t('Ваша фамилия')}
               className={styles.input}
               readonly={readonly}
            />
            <Input
               onChange={onChangeAge}
               value={data?.age}
               placeholder={t('Ваш возраст')}
               className={styles.input}
               readonly={readonly}
            />
            <Input
               onChange={onChangeCity}
               value={data?.city}
               placeholder={t('Город')}
               className={styles.input}
               readonly={readonly}
            />
            <Input
               onChange={onChangeUsername}
               value={data?.username}
               placeholder={t('Введите имя пользователя')}
               className={styles.input}
               readonly={readonly}
            />
            <Input
               onChange={onChangeAvatar}
               value={data?.avatar}
               placeholder={t('Введите ссылку на аватар')}
               className={styles.input}
               readonly={readonly}
            />
            <CurrencySelect
               className={styles.input}
               value={data?.currency}
               onChange={onChangeCurrency}
               readonly={readonly}
            />
            <CountrySelect
               className={styles.input}
               value={data?.country}
               onChange={onChangeCountry}
               readonly={readonly}
            />
         </div>
      </div>
   );
};
