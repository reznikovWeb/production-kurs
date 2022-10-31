import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { createReduxStore } from '../config/store';

interface StoreProviderProps {
   children?: ReactNode;
   initialState?: DeepPartial<StateSchema>;
   asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children, initialState, asyncReducers }) => {
   const store = createReduxStore(initialState as StateSchema, asyncReducers as ReducersMapObject<StateSchema>);

   return <Provider store={store}>{children}</Provider>;
};
