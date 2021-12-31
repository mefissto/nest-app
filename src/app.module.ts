import { Module } from '@nestjs/common';

import { UsersModule } from './controllers/users/users.module';
import { AuthModule } from './controllers/auth/auth.module';
import { NewsModule } from './controllers/news/news.module';
import { DatabaseModule } from "@database/database.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    NewsModule,
  ],
})
export class AppModule {
}
