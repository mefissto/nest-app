import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(public message: string = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
