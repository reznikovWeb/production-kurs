import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getRouteArticles, getRouteArticlesEdit } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

import { getArticleDetailsData } from '@/entities/Article';

import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
   className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: ArticleDetailsPageHeaderProps) => {
   const canEdit = useSelector(getCanEditArticle);
   const article = useSelector(getArticleDetailsData);

   const { t } = useTranslation('article-details');

   const navigate = useNavigate();

   const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
   }, [navigate]);

   const onEditArticle = useCallback(() => {
      if (article) {
         navigate(getRouteArticlesEdit(article.id));
      }
   }, [article?.id, navigate]);

   return (
      <HStack max justify="between" className={classNames('', {}, [className])}>
         <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
            {t('Назад к списку')}
         </Button>
         {canEdit && (
            <Button theme={ThemeButton.OUTLINE} onClick={onEditArticle}>
               {t('Редактировать')}
            </Button>
         )}
      </HStack>
   );
});
