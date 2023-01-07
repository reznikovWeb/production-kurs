import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
   text: '',
};

const addCommentFormSlice = createSlice({
   name: 'addCommentForm',
   initialState,
   reducers: {
      setText(state, action: PayloadAction<string>) {
         state.text = action.payload;
      },
   },
   // extraReducers: (builder) => {
   //    builder
   //       .addCase(loginByUsername.pending, (state, action) => {
   //          state.isLoading = true;
   //          state.error = undefined;
   //       })
   //       .addCase(loginByUsername.fulfilled, (state, action) => {})
   //       .addCase(loginByUsername.rejected, (state, action) => {
   //          state.isLoading = false;
   //          state.error = action.payload;
   //       });
   // },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
