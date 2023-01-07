import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { fetchProfileData } from './fetchProfileData';

const data = {
   username: 'admin',
   age: 22,
   country: Country.Kazakhstan,
   lastname: 'test',
   first: 'test',
   city: 'test',
   currency: Currency.EUR,
};

describe('loginByUsername.test', () => {
   test('success', async () => {
      const thunk = new TestAsyncThunk(fetchProfileData);
      thunk.api.get.mockReturnValue(Promise.resolve({ data }));
      const result = await thunk.callThunk('1');

      // Ожидаем, что выполнился get запрос
      expect(thunk.api.get).toHaveBeenCalled();
      // Ожидаем, что статус fulfilled
      expect(result.meta.requestStatus).toBe('fulfilled');
      // Ожидаем, что асинк санк вернет определенные данные
      expect(result.payload).toEqual(data);
   });

   test('error login', async () => {
      const thunk = new TestAsyncThunk(fetchProfileData);
      thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
      const result = await thunk.callThunk('1');
      expect(result.meta.requestStatus).toBe('rejected');
   });
});
