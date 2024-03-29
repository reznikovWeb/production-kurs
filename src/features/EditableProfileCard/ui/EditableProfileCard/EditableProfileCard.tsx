import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
   DynamicModuleLoader,
   ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text/Text';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard } from '@/entities/Profile';

import { ValidateProfileError } from '../../model/const/const';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileLoading } from '../../model/selectors/getProfileLoading/getProfileLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
   className?: string;
   id?: string;
}

const reducers: ReducersList = {
   profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
   const { className, id } = props;
   const { t } = useTranslation('profile');

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
      <DynamicModuleLoader reducers={reducers}>
         <VStack gap="8" max className={classNames('', {}, [className])}>
            <EditableProfileCardHeader />
            {validateErrors?.length &&
               validateErrors.map((err) => (
                  <Text
                     theme={TextTheme.ERROR}
                     text={validateErrorTranslates[err]}
                     key={err}
                     data-testid="EditableProfileCard.Error"
                  />
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
         </VStack>
      </DynamicModuleLoader>
   );
});
