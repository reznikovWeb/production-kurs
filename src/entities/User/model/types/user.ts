import { UserRole } from '../const/userConst';

export interface IUser {
   id: string;
   username: string;
   avatar?: string;
   roles?: UserRole[];
}

export interface IUserSchema {
   authData?: IUser;

   _inited: boolean;
}
