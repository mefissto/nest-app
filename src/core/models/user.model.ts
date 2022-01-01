import { ApiProperty } from '@nestjs/swagger';

import { UserRolesEnum } from '../enums/user-roles.enum';

export class User {
  @ApiProperty({ example: 'test@gmail.com', description: 'Email address' })
  public email: string;

  @ApiProperty({ example: '12345', description: 'User password' })
  public password: string;

  @ApiProperty({ example: 'Mefissto', description: 'Username' })
  public username: string;

  @ApiProperty({ example: UserRolesEnum.Admin, description: 'User role' })
  public role: UserRolesEnum;

  @ApiProperty()
  public _id: string;
}
