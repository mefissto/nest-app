export class AuthUser {
  public email: string;
  public password: string;
  public username?: string;

  constructor(props: AuthUser = {} as AuthUser) {
    Object.assign(this, props);
  }
}
