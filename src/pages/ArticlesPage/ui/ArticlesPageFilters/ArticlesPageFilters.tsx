import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';

import {
   ArticleSortField,
   ArticleType,
   ArticleTypeTabs,
   ArticleView,
   ArticleViewSelector,
} from '@/entities/Article';

import { ArticleSortSelector } from '../../../../entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import {
   getArticlesPageOrder,
   getArticlesPageSearch,
   getArticlesPageSort,
   getArticlesPageType,
   getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import styles from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
   className?: string;
}

export const ArticlesPageFilters = memo(({ className }: ArticlesPageFiltersProps) => {
   const view = useSelector(getArticlesPageView);
   const order = useSelector(getArticlesPageOrder);
   const sort = useSelector(getArticlesPageSort);
   const search = useSelector(getArticlesPageSearch);
   const type = useSelector(getArticlesPageType);

   const { t } = useTranslation();

   const dispatch = useAppDispatch();

   const fetchData = useCallback(() => {
      dispatch(fetchArticlesList({ replace: true }));
   }, [dispatch]);

   const debouncedFetchData = useDebounce(fetchData, 500);

   const onChangeView = useCallback(
      (view: ArticleView) => {
         dispatch(articlesPageActions.setView(view));
      },
      [dispatch],
   );

   const onChangeSort = useCallback(
      (newSort: ArticleSortField) => {
         dispatch(articlesPageActions.setSort(newSort));
         dispatch(articlesPageActions.setPage(1));
         fetchData();
      },
      [dispatch, fetchData],
   );

   const onChangeOrder = useCallback(
      (newOrder: SortOrder) => {
         dispatch(articlesPageActions.setOrder(newOrder));
         dispatch(articlesPageActions.setPage(1));
         fetchData();
      },
      [dispatch, fetchData],
   );

   const onChangeSearch = useCallback(
      (search: string) => {
         dispatch(articlesPageActions.setSearch(search));
         dispatch(articlesPageActions.setPage(1));
         debouncedFetchData();
      },
      [dispatch, debouncedFetchData],
   );

   const onChangeType = useCallback(
      (value: ArticleType) => {
         dispatch(articlesPageActions.setType(value));
         dispatch(articlesPageActions.setPage(1));
         fetchData();
      },
      [dispatch, fetchData],
   );

   return (
      <div className={classNames(styles.ArticlesPageFilters, {}, [className])}>
         <div className={styles.sortWrapper}>
            <ArticleSortSelector
               order={order}
               sort={sort}
               onChangeSort={onChangeSort}
               onChangeOrder={onChangeOrder}
            />
            <ArticleViewSelector view={view} onViewClick={onChangeView} />
         </div>
         <Card className={styles.search}>
            <Input placeholder={t('Поиск')} onChange={onChangeSearch} value={search} />
         </Card>
         <ArticleTypeTabs className={styles.tabs} onChangeType={onChangeType} value={type} />
      </div>
   );
});
