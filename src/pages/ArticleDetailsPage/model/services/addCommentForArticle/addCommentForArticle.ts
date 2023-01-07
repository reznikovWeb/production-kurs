import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { getArticleDetailsData } from 'entities/Article';
import { IComment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<IComment, string, ThunkConfig<string>>(
   'articleDetails/addCommentForArticle',
   async (text, thunkAPI) => {
      const { rejectWithValue, getState, extra, dispatch } = thunkAPI;

      try {
         const userData = getUserAuthData(getState());
         const article = getArticleDetailsData(getState());

         if (!userData || !text || !article) {
            return rejectWithValue('no data');
         }

         const response = await extra.api.post<IComment>('/comments', {
            articleId: article.id,
            userId: userData.id,
            text,
         });

         if (!response.data) {
            throw new Error();
         }

         dispatch(fetchCommentsByArticleId(article.id));
         return response.data;
      } catch (e) {
         return rejectWithValue('error');
      }
   },
);
