import { profileReducer } from 'entities/Profile';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import styles from './ProfilePage.module.scss';

interface ProfilePageProps {
   className?: string;
}

const reducers: ReducersList = {
   profile: profileReducer,
};

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
   const { t } = useTranslation();

   return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
         <div className={classNames(styles.ProfilePage, {}, [className])}>{t('PROFILE PAGE')}</div>
      </DynamicModuleLoader>
   );
};

export default ProfilePage;
