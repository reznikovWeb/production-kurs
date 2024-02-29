import { Reducer } from '@reduxjs/toolkit';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { ReduxStoreWithManager, StateSchemaKey } from '@/app/providers/StoreProvider';

export type ReducersList = {
   [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
   reducers: ReducersList;
   removeAfterUnmount?: boolean;
   children: ReactNode;
}

export const DynamicModuleLoader = ({
   reducers,
   children,
   removeAfterUnmount = true,
}: DynamicModuleLoaderProps) => {
   const store = useStore() as ReduxStoreWithManager;

   const dispatch = useDispatch();

   useEffect(() => {
      const mountedReducers = store.reducerManager.getReducerMap();

      Object.entries(reducers).forEach(([name, reducer]) => {
         const mounted = !!mountedReducers[name as StateSchemaKey];
         // Добавляем только если редюсер еще не вмонтирован
         if (!mounted) {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
         }
      });

      return () => {
         if (removeAfterUnmount) {
            Object.entries(reducers).forEach(([name]) => {
               store.reducerManager.remove(name as StateSchemaKey);
               dispatch({ type: `@DESTROY ${name} reducer` });
            });
         }
      };
      // eslint-disable-next-line
   }, []);
   // eslint-disable-next-line react/jsx-no-useless-fragment
   return <>{children}</>;
};
