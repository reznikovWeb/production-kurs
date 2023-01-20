import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

import { Article, ArticleView } from 'entities/Article';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlesPageSchema';

const articlesAdapter = createEntityAdapter<Article>({
   selectId: (article) => article.id,
});

// В нем хранятся все селекторы, поэтому возвращаем стейт
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
   (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPage = createSlice({
   name: 'articlesPage',
   initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
      isLoading: false,
      error: undefined,
      view: ArticleView.SMALL,
      ids: [],
      entities: {},
      page: 1,
      hasMore: true,
      _inited: false,
   }),
   reducers: {
      setView: (state, action: PayloadAction<ArticleView>) => {
         state.view = action.payload;
         localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
      },
      setPage: (state, action: PayloadAction<number>) => {
         state.page = action.payload;
      },
      initState: (state) => {
         const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
         state.view = view;
         state.limit = view === ArticleView.BIG ? 4 : 9;
         state._inited = true;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchArticlesList.pending, (state) => {
         state.error = undefined;
         state.isLoading = true;
      });
      builder.addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
         state.isLoading = false;
         // Добавляем данные в конец
         articlesAdapter.addMany(state, action.payload);
         state.hasMore = action.payload.length > 0;
      });
      builder.addCase(fetchArticlesList.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } = articlesPage;
