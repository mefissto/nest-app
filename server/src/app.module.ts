import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@database/database.module';
import { UsersModule } from './controllers/users/users.module';
import { AuthModule } from './controllers/auth/auth.module';
import { NewsModule } from './controllers/news/news.module';
import { EmailModule } from './controllers/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env`, isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    NewsModule,
    EmailModule,
  ],
})
export class AppModule {}
