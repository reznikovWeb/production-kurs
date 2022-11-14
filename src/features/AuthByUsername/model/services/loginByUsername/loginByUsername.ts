import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { IUser, userActions } from 'entities/User';

import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface ILoginByUsernameProps {
   username: string;
   password: string;
}

export const loginByUsername = createAsyncThunk<IUser, ILoginByUsernameProps, ThunkConfig<string>>(
   'login/loginByUsername',
   async ({ username, password }, thunkAPI) => {
      const { dispatch, extra, rejectWithValue } = thunkAPI;
      try {
         const response = await extra.api.post<IUser>('/login', {
            username,
            password,
         });
         if (!response.data) {
            throw new Error();
         }
         localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
         dispatch(userActions.setAuthData(response.data));
         return response.data;
      } catch (e) {
         console.log(e);
         return rejectWithValue('error');
      }
   },
);
