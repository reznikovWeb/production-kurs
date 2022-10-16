import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser, userActions } from 'entities/User';

import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface ILoginByUsernameProps {
   username: string;
   password: string;
}

export const loginByUsername = createAsyncThunk<IUser, ILoginByUsernameProps, { rejectValue: string }>(
   'login/loginByUsername',
   async ({ username, password }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axios.post<IUser>('http://localhost:8000/login', {
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
