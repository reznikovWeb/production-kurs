import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

import { getArticleDetailsData } from 'entities/Article';

import { getCanEditArticle } from '../../model/selectors/article';
import styles from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
   className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: ArticleDetailsPageHeaderProps) => {
   const canEdit = useSelector(getCanEditArticle);
   const article = useSelector(getArticleDetailsData);

   const { t } = useTranslation('article-details');

   const navigate = useNavigate();

   const onBackToList = useCallback(() => {
      navigate(RoutePath.articles);
   }, [navigate]);

   const onEditArticle = useCallback(() => {
      navigate(`${RoutePath.article_details}${article?.id}/edit`);
   }, [article?.id, navigate]);

   return (
      <div className={classNames(styles.ArticleDetailsPageHeader, {}, [className])}>
         <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
            {t('Назад к списку')}
         </Button>
         {canEdit && (
            <Button className={styles.editBtn} theme={ThemeButton.OUTLINE} onClick={onEditArticle}>
               {t('Редактировать')}
            </Button>
         )}
      </div>
   );
});
