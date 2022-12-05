import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { validateProfileData } from 'entities/Profile/model/services/validateProfileData/validateProfileData';

import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile, ValidateProfileError } from '../../types/profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
   'profile/updateProfileData',
   async (_, thunkAPI) => {
      const { extra, rejectWithValue, getState } = thunkAPI;

      const formData = getProfileForm(getState());

      const errors = validateProfileData(formData);
      console.log(errors);
      if (errors.length) {
         return rejectWithValue(errors);
      }

      try {
         const response = await extra.api.put<Profile>('/profile', formData);

         return response.data;
      } catch (e) {
         return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
      }
   },
);
