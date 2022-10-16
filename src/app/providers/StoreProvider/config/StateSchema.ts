import { CounterSchema } from 'entities/Counter';
import { IUserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';

export interface StateSchema {
   counter: CounterSchema;
   user: IUserSchema;
   loginForm?: LoginSchema;
}
