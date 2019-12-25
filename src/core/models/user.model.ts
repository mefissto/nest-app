export class User {
  constructor(
    public email: string,
    public password: string,
    public username?: string,
    public role?: number,
    public _id?: number,
  ) {}
}
