export class News {
  constructor(
    public title: string,
    public description: string,
    public author: string,
    public image?: string,
    public dateCreation?: Date,
    public _id?: number,
  ) {}
}
