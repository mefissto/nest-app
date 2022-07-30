export class AuthUser {
  public email: string;
  public password: string;
  public username: string;
  public _id?: string;

  constructor(props: Partial<AuthUser> = {}) {
    Object.assign(this, props);
  }
}
