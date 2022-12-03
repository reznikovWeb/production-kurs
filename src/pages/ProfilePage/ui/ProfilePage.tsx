import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import {
   ProfileCard,
   fetchProfileData,
   getProfileError,
   getProfileForm,
   getProfileLoading,
   getProfileReadonly,
   profileActions,
   profileReducer,
} from 'entities/Profile';

import styles from './ProfilePage.module.scss';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

interface ProfilePageProps {
   className?: string;
}

const reducers: ReducersList = {
   profile: profileReducer,
};

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
   const dispatch = useAppDispatch();
   const form = useSelector(getProfileForm);
   const error = useSelector(getProfileError);
   const isLoading = useSelector(getProfileLoading);
   const readonly = useSelector(getProfileReadonly);

   useEffect(() => {
      dispatch(fetchProfileData());
   }, [dispatch]);

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

   return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
         <div className={classNames(styles.ProfilePage, {}, [className])}>
            <ProfilePageHeader />
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
         </div>
      </DynamicModuleLoader>
   );
};

export default ProfilePage;
