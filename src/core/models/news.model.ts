import { ApiProperty } from "@nestjs/swagger";


export class News {
  @ApiProperty({ example: 'Some title', description: 'Description of the article' })
  public title: string;

  @ApiProperty({ example: 'Lorem ipsum', description: 'Description of the article' })
  public description: string;

  @ApiProperty({ example: 'Some User', description: 'Author of the article' })
  public author: string;

  @ApiProperty({ example: 'path/to/image', description: 'Image' })
  public image?: string;
}
