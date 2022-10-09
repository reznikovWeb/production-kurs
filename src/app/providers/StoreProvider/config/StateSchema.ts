import { CounterSchema } from 'entities/Counter';
import { IUserSchema } from 'entities/User';

export interface StateSchema {
   counter: CounterSchema;
   user: IUserSchema;
}
