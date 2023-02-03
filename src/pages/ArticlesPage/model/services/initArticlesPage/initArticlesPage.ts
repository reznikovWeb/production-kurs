import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { SortOrder } from 'shared/types';

import { ArticleSortField } from 'entities/Article';

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
   'articlesPage/initArticlesPage',
   async (searchParams, thunkAPI) => {
      const { dispatch, getState } = thunkAPI;
      const inited = getArticlesPageInited(getState());

      if (!inited) {
         const orderFromUrl = searchParams.get('order') as SortOrder;
         const sortFromUrl = searchParams.get('sort') as ArticleSortField;
         const searchFromUrl = searchParams.get('search');

         if (orderFromUrl) {
            dispatch(articlesPageActions.setOrder(orderFromUrl));
         }

         if (sortFromUrl) {
            dispatch(articlesPageActions.setSort(sortFromUrl));
         }

         if (searchFromUrl) {
            dispatch(articlesPageActions.setSearch(searchFromUrl));
         }

         dispatch(articlesPageActions.initState());
         dispatch(fetchArticlesList({}));
      }
   },
);
