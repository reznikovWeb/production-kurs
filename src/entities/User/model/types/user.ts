export enum UserRole {
   ADMIN = 'ADMIN',
   USER = 'USER',
   MANAGER = 'MANAGER',
}

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
