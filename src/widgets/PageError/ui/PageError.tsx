import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import styles from './PageError.module.scss';

interface PageErrorProps {
  className?: string;
}

export const PageError: React.FC<PageErrorProps> = ({ className }) => {
   const { t } = useTranslation();

   const reloadPage = () => {
      window.location.reload();
   };

   return (
      <div className={classNames(styles.pageError, {}, [className])}>
         <p>{t('Произошла непредвиденная ошибка')}</p>
         <Button onClick={reloadPage}>
            {t('Обновить страницу')}
         </Button>
      </div>
   );
};
