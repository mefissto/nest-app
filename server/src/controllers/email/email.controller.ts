import { EmailData } from '@models/email-data.model';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmailService } from './email.service';

@UseGuards(JwtAuthGuard)
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  sendEmail(@Body() { email }: { email: string }): Promise<any> {
    return this.emailService.sendEmail(new EmailData({ email }));
  }
}
