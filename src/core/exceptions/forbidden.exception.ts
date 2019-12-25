import { HttpStatus, HttpException } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(public message: string | object = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
