import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import React, { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
   [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
   reducers: ReducersList;
   removeAfterUnmount?: boolean;
}

type ReducersListEntry = [StateSchemaKey, Reducer];

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({ reducers, children, removeAfterUnmount }) => {
   const store = useStore() as ReduxStoreWithManager;

   const dispatch = useDispatch();

   useEffect(() => {
      Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
         store.reducerManager.add(name, reducer);
         dispatch({ type: `@INIT ${name} reducer` });
      });

      return () => {
         if (removeAfterUnmount) {
            Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
               store.reducerManager.remove(name);
               dispatch({ type: `@DESTROY ${name} reducer` });
            });
         }
      };
      // eslint-disable-next-line
   }, []);
   // eslint-disable-next-line react/jsx-no-useless-fragment
   return <>{children}</>;
};
