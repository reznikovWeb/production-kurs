import { ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { addCommentFormReducer } from 'features/AddCommentForm/model/slice/addCommentFormSlice';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice';

import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { profileReducer } from 'entities/Profile';

const defaultAsyncReducers: ReducersList = {
   loginForm: loginReducer,
   profile: profileReducer,
   articleDetails: articleDetailsReducer,
   addCommentForm: addCommentFormReducer,
   articleDetailsComments: articleDetailsCommentsReducer,
};

export const StoreDecorator =
   (state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) =>
   (StoryComponent: Story) =>
      (
         <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
            <StoryComponent />
         </StoreProvider>
      );
