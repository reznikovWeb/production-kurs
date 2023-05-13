import { StateSchema } from '@/app/providers/StoreProvider';
import { ValidateProfileError } from '@/features/EditableProfileCard';

import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileReadonly.test', () => {
   test('should return data', () => {
      const data = [ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE];

      const state: DeepPartial<StateSchema> = {
         profile: {
            validateError: data,
         },
      };
      expect(getProfileValidateErrors(state as StateSchema)).toEqual(data);
   });

   test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
   });
});
