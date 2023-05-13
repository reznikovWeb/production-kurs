import { CombinedState, Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { scrollSaveReducer } from '@/features/ScrollSave';

import { api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';

import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';

import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
   initialState?: StateSchema,
   asyncReducers?: ReducersMapObject<StateSchema>,
) {
   const rootReducers: ReducersMapObject<StateSchema> = {
      ...asyncReducers,
      counter: counterReducer,
      user: userReducer,
      scrollSchema: scrollSaveReducer,
      [rtkApi.reducerPath]: rtkApi.reducer,
   };

   const reducerManager = createReducerManager(rootReducers);

   const extraArg: ThunkExtraArg = {
      api,
   };

   const store = configureStore({
      reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
      devTools: __IS_DEV__,
      preloadedState: initialState,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            thunk: {
               extraArgument: extraArg,
            },
         }).concat(rtkApi.middleware),
   });

   // @ts-ignore
   store.reducerManager = reducerManager;

   return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
