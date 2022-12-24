import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';

import { ArticleDetails } from 'entities/Article';

import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
   className?: string;
}

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({ className }) => {
   const { t } = useTranslation('article-details');
   const { id } = useParams<{ id: string }>();

   if (!id) {
      return (
         <div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
            {t('Статья не найдена')}
         </div>
      );
   }

   return (
      <div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
         <ArticleDetails id={id} />
      </div>
   );
};

export default memo(ArticleDetailsPage);
