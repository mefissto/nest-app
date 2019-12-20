export class User {
  constructor(
    public email: string,
    public password: number,
    public username?: string,
    public role?: number,
  ) {}
}
