import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './utils/app.config';
import { UsersModule } from './controllers/users/users.module';
import { AuthModule } from './controllers/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(AppConfig.connectionString),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
