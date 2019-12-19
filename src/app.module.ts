import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './utils/app.config';

@Module({
  imports: [MongooseModule.forRoot(AppConfig.connectionString)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
