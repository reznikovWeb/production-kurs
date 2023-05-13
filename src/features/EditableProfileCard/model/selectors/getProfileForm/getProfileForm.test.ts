import { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
   test('should return data', () => {
      const form = {
         username: 'admin',
         age: 22,
         country: Country.Kazakhstan,
         lastname: 'test',
         first: 'test',
         city: 'test',
         currency: Currency.EUR,
      };
      const state: DeepPartial<StateSchema> = {
         profile: {
            form,
         },
      };
      expect(getProfileForm(state as StateSchema)).toEqual(form);
   });

   test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getProfileForm(state as StateSchema)).toEqual(undefined);
   });
});
