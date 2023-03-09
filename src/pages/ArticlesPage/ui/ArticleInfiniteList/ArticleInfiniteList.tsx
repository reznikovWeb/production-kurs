import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';

import { ArticleList } from 'entities/Article';

import {
   getArticlesPageError,
   getArticlesPageIsLoading,
   getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slice/articlesPageSlice';

interface ArticleInfiniteListProps {
   className?: string;
}

export const ArticleInfiniteList = memo(({ className }: ArticleInfiniteListProps) => {
   const articles = useSelector(getArticles.selectAll);
   const isLoading = useSelector(getArticlesPageIsLoading);
   const error = useSelector(getArticlesPageError);
   const view = useSelector(getArticlesPageView);

   const { t } = useTranslation();

   if (error) {
      return <Text text={t('Ошибка при загрузке данных')} />;
   }

   return (
      <ArticleList
         className={classNames('', {}, [className])}
         view={view}
         articles={articles}
         isLoading={isLoading}
      />
   );
});
