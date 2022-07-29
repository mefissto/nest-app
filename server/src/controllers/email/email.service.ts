import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';

import { EmailData } from '@models/email-data.model';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  public sendEmail(data: EmailData): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      to: data.email,
      subject: data.subject || 'N/A',
      template: data.template || './email',
      context: { ...data.context },
    });
  }
}
