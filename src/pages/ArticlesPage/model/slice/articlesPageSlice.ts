import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/types';

import { Article, ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';

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
      sort: ArticleSortField.CREATED,
      search: '',
      order: 'asc',
      limit: 9,
      type: ArticleType.All,
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
      setOrder: (state, action: PayloadAction<SortOrder>) => {
         state.order = action.payload;
      },
      setSearch: (state, action: PayloadAction<string>) => {
         state.search = action.payload;
      },
      setSort: (state, action: PayloadAction<ArticleSortField>) => {
         state.sort = action.payload;
      },
      setType: (state, action: PayloadAction<ArticleType>) => {
         state.type = action.payload;
      },
      initState: (state) => {
         const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
         state.view = view;
         state.limit = view === ArticleView.BIG ? 4 : 9;
         state._inited = true;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchArticlesList.pending, (state, action) => {
         state.error = undefined;
         state.isLoading = true;
         if (action.meta.arg.replace) {
            articlesAdapter.removeAll(state);
         }
      });
      builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
         state.isLoading = false;
         state.hasMore = action.payload.length >= state.limit;
         if (action.meta.arg.replace) {
            // Перезаписываем данные
            articlesAdapter.setAll(state, action.payload);
         } else {
            // Добавляем данные в конец
            articlesAdapter.addMany(state, action.payload);
         }
      });
      builder.addCase(fetchArticlesList.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } = articlesPage;
