import { ValidateProfileError } from 'features/EditableProfileCard/model/const/const';

import { Profile } from 'entities/Profile';

export interface ProfileSchema {
   data?: Profile;
   form?: Profile;
   isLoading: boolean;
   error?: string;
   readonly: boolean;
   validateError?: ValidateProfileError[];
}
