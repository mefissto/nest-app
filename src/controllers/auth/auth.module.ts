import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AppConfig } from '@configs/app.config';
import { DatabaseModule } from "@database/database.module";

@Module({
  imports: [DatabaseModule, UsersModule, PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
    secret: AppConfig.jwtConstants.secret, signOptions: { expiresIn: '1h' },
  }),], controllers: [AuthController], providers: [AuthService, LocalStrategy, JwtStrategy], exports: [AuthService],
})
export class AuthModule {}
