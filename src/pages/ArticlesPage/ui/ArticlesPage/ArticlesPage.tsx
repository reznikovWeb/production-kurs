import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import {
   DynamicModuleLoader,
   ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'shared/ui/Page/Page';

import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';

import {
   getArticlesPageError,
   getArticlesPageHasMore,
   getArticlesPageIsLoading,
   getArticlesPagePageNum,
   getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slice/articlesPageSlice';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
   className?: string;
}

const reducers: ReducersList = {
   articlesPage: articlesPageReducer,
};

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
   const dispatch = useAppDispatch();

   const articles = useSelector(getArticles.selectAll);
   const isLoading = useSelector(getArticlesPageIsLoading);
   const error = useSelector(getArticlesPageError);
   const view = useSelector(getArticlesPageView);

   const onChangeView = useCallback(
      (view: ArticleView) => {
         dispatch(articlesPageActions.setView(view));
      },
      [dispatch],
   );

   const onLoadNextPart = useCallback(() => {
      dispatch(fetchNextArticlesPage());
   }, [dispatch]);

   useInitialEffect(() => {
      dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({ page: 1 }));
   });

   return (
      <DynamicModuleLoader reducers={reducers}>
         <Page className={classNames(styles.ArticlesPage, {}, [className])} onScrollEnd={onLoadNextPart}>
            <ArticleViewSelector view={view} onViewClick={onChangeView} />
            <ArticleList view={view} articles={articles} isLoading={isLoading} />
         </Page>
      </DynamicModuleLoader>
   );
};

export default memo(ArticlesPage);
