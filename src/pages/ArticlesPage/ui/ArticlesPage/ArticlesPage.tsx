import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
   DynamicModuleLoader,
   ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { Page } from '@/widgets/Page';

import { getArticlesPageSearch } from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
   className?: string;
}

const reducers: ReducersList = {
   articlesPage: articlesPageReducer,
};

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
   const [searchParams] = useSearchParams();

   const search = useSelector(getArticlesPageSearch);

   const dispatch = useAppDispatch();

   const onLoadNextPart = useCallback(() => {
      // TODO убрать этот костыль
      if (!search) {
         dispatch(fetchNextArticlesPage());
      }
   }, [dispatch, search]);

   useInitialEffect(() => {
      dispatch(initArticlesPage(searchParams));
   });

   return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
         <Page
            className={classNames(styles.ArticlesPage, {}, [className])}
            onScrollEnd={onLoadNextPart}
         >
            <ArticlesPageFilters />
            <ArticleInfiniteList className={styles.list} />
         </Page>
      </DynamicModuleLoader>
   );
};

export default memo(ArticlesPage);
