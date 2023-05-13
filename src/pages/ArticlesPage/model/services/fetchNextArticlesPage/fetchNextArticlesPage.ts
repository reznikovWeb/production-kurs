import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import {
   getArticlesPageHasMore,
   getArticlesPageIsLoading,
   getArticlesPagePageNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
   'pages/fetchNextArticlesPage',
   async (_, thunkAPI) => {
      const { rejectWithValue, getState, dispatch } = thunkAPI;
      const hasMore = getArticlesPageHasMore(getState());
      const page = getArticlesPagePageNum(getState());
      const isLoading = getArticlesPageIsLoading(getState());

      if (hasMore && !isLoading) {
         dispatch(articlesPageActions.setPage(page + 1));
         dispatch(fetchArticlesList({}));
      }
   },
);
