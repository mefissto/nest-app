export class User {
  constructor(
      public email: string,
      public password: string,
      public username: string,
      public role?: number,
      public dateCreation?: Date,
      public _id?: number,
  ) {
  }
}
