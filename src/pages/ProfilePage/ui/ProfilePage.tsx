import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import {
   DynamicModuleLoader,
   ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'shared/ui/Page/Page';
import { Text, TextTheme } from 'shared/ui/Text/Text';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import {
   ProfileCard,
   ValidateProfileError,
   fetchProfileData,
   getProfileError,
   getProfileForm,
   getProfileLoading,
   getProfileReadonly,
   getProfileValidateErrors,
   profileActions,
   profileReducer,
} from 'entities/Profile';

import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

interface ProfilePageProps {
   className?: string;
}

const reducers: ReducersList = {
   profile: profileReducer,
};

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
   const { t } = useTranslation('profile');

   const { id } = useParams<{ id: string }>();

   const form = useSelector(getProfileForm);
   const error = useSelector(getProfileError);
   const isLoading = useSelector(getProfileLoading);
   const readonly = useSelector(getProfileReadonly);
   const validateErrors = useSelector(getProfileValidateErrors);

   const dispatch = useAppDispatch();

   const validateErrorTranslates = {
      [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
      [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
      [ValidateProfileError.INCORRECT_COUNTRY]: t('Неккоректный регион'),
      [ValidateProfileError.INCORRECT_AGE]: t('Неккоректный возраст'),
      [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
   };

   const onChangeFirstname = useCallback(
      (value?: string) => {
         dispatch(profileActions.updateProfile({ first: value || '' }));
      },
      [dispatch],
   );

   const onChangeLastname = useCallback(
      (value?: string) => {
         dispatch(profileActions.updateProfile({ lastname: value || '' }));
      },
      [dispatch],
   );

   const onChangeCity = useCallback(
      (value?: string) => {
         dispatch(profileActions.updateProfile({ city: value || '' }));
      },
      [dispatch],
   );

   const onChangeAge = useCallback(
      (value?: string) => {
         dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
      },
      [dispatch],
   );

   const onChangeUsername = useCallback(
      (value?: string) => {
         dispatch(profileActions.updateProfile({ username: value || '' }));
      },
      [dispatch],
   );

   const onChangeAvatar = useCallback(
      (value?: string) => {
         dispatch(profileActions.updateProfile({ avatar: value || '' }));
      },
      [dispatch],
   );

   const onChangeCurrency = useCallback(
      (currency: Currency) => {
         dispatch(profileActions.updateProfile({ currency }));
      },
      [dispatch],
   );

   const onChangeCountry = useCallback(
      (country: Country) => {
         dispatch(profileActions.updateProfile({ country }));
      },
      [dispatch],
   );

   useInitialEffect(() => {
      if (id) dispatch(fetchProfileData(id));
   });

   return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
         <Page className={classNames('', {}, [className])}>
            <ProfilePageHeader />
            {validateErrors?.length &&
               validateErrors.map((err) => (
                  <Text theme={TextTheme.ERROR} text={validateErrorTranslates[err]} key={err} />
               ))}
            <ProfileCard
               data={form}
               isLoading={isLoading}
               error={error}
               readonly={readonly}
               onChangeFirstname={onChangeFirstname}
               onChangeLastname={onChangeLastname}
               onChangeCity={onChangeCity}
               onChangeAge={onChangeAge}
               onChangeUsername={onChangeUsername}
               onChangeAvatar={onChangeAvatar}
               onChangeCurrency={onChangeCurrency}
               onChangeCountry={onChangeCountry}
            />
         </Page>
      </DynamicModuleLoader>
   );
};

export default ProfilePage;
