import React from 'react';
import { useTranslation } from 'react-i18next';

import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { HStack, VStack } from 'shared/ui/Stack';
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
         <HStack
            justify="center"
            max
            className={classNames(styles.profileCard, { [styles.loading]: true }, [className])}
         >
            <Loader />
         </HStack>
      );
   }

   if (error) {
      return (
         <HStack
            justify="center"
            max
            className={classNames(styles.profileCard, {}, [className, styles.error])}
         >
            <Text
               theme={TextTheme.ERROR}
               title={t('Произошла ошибка при загрузке профиля')}
               text={t('Попробуйте обновить страницу')}
               align={TextAlign.CENTER}
            />
         </HStack>
      );
   }

   const mods: Mods = {
      [styles.editing]: !readonly,
   };

   return (
      <VStack max gap="16" className={classNames(styles.profileCard, mods, [className])}>
         {/* eslint-disable-next-line i18next/no-literal-string */}
         {data?.avatar && (
            <HStack justify="center" className={styles.avatarWrapper}>
               <Avatar src={data?.avatar} />
            </HStack>
         )}

         <Input
            onChange={onChangeFirstname}
            value={data?.first}
            placeholder={t('Ваше имя')}
            readonly={readonly}
         />
         <Input
            onChange={onChangeLastname}
            value={data?.lastname}
            placeholder={t('Ваша фамилия')}
            readonly={readonly}
         />
         <Input
            onChange={onChangeAge}
            value={data?.age}
            placeholder={t('Ваш возраст')}
            readonly={readonly}
         />
         <Input
            onChange={onChangeCity}
            value={data?.city}
            placeholder={t('Город')}
            readonly={readonly}
         />
         <Input
            onChange={onChangeUsername}
            value={data?.username}
            placeholder={t('Введите имя пользователя')}
            readonly={readonly}
         />
         <Input
            onChange={onChangeAvatar}
            value={data?.avatar}
            placeholder={t('Введите ссылку на аватар')}
            readonly={readonly}
         />
         <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
         <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
      </VStack>
   );
};
