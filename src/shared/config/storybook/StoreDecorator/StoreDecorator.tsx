import { ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';

import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { articleDetailsReducer } from '@/entities/Article/testing';

import { addCommentFormReducer } from '@/features/AddCommentForm/testing';
import { loginReducer } from '@/features/AuthByUsername/testing';
// eslint-disable-next-line fsd-rules/layer-imports
import { profileReducer } from '@/features/EditableProfileCard';

import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';

const defaultAsyncReducers: ReducersList = {
   loginForm: loginReducer,
   profile: profileReducer,
   articleDetails: articleDetailsReducer,
   addCommentForm: addCommentFormReducer,
   articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator =
   (state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) =>
   (StoryComponent: Story) =>
      (
         <StoreProvider
            initialState={state}
            asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
         >
            <StoryComponent />
         </StoreProvider>
      );
