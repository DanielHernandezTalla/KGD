interface IUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string | null;
  almacen?: string | null;
}

export interface ISession {
  user: IUser;
}
