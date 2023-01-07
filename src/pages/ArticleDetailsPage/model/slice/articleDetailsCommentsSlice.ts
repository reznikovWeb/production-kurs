import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

import { IComment } from 'entities/Comment';

import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

const commentsAdapter = createEntityAdapter<IComment>({
   selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
   (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);

const articleDetailsComments = createSlice({
   name: 'articleDetailsCommentsSlice',
   initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
      isLoading: false,
      error: undefined,
      ids: [],
      entities: {},
   }),
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchCommentsByArticleId.pending, (state) => {
         state.error = undefined;
         state.isLoading = true;
      });
      builder.addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
         state.isLoading = false;
         commentsAdapter.setAll(state, action.payload);
      });
      builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsComments;
