import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile';
import React, { useEffect } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import styles from './ProfilePage.module.scss';

interface ProfilePageProps {
   className?: string;
}

const reducers: ReducersList = {
   profile: profileReducer,
};

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchProfileData());
   }, [dispatch]);

   return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
         <div className={classNames(styles.ProfilePage, {}, [className])}>
            <ProfileCard />
         </div>
      </DynamicModuleLoader>
   );
};

export default ProfilePage;
