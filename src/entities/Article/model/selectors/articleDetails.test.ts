import { StateSchema } from 'app/providers/StoreProvider';

import { getArticleDetailIsLoading, getArticleDetailsData, getArticleDetailsError } from './articleDetails';

describe('articleDetails', () => {
   test('getArticleDetailsData', () => {
      const data = {
         id: '1',
         title: 'title',
      };
      const state: DeepPartial<StateSchema> = {
         articleDetails: {
            data,
         },
      };
      expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
   });

   test('getArticleDetailIsLoading', () => {
      const state: DeepPartial<StateSchema> = {
         articleDetails: {
            isLoading: true,
         },
      };
      expect(getArticleDetailIsLoading(state as StateSchema)).toEqual(true);
   });

   test('getArticleDetailsError', () => {
      const state: DeepPartial<StateSchema> = {
         articleDetails: {
            error: 'error',
         },
      };
      expect(getArticleDetailsError(state as StateSchema)).toEqual('error');
   });

   test('should not work with empty data', () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
   });
});
