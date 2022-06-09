import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
  @ApiProperty({ example: 'FSDFs5fsd55f5sdfFDF', description: 'Token' })
  public access_token: string
}
