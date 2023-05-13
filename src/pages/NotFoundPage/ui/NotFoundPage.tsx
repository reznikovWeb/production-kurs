import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ className }) => {
   const { t } = useTranslation();

   return (
      <div className={classNames(styles.notFoundPage, {}, [className])}>
         {t('Страница не найдена')}
      </div>
   );
};
