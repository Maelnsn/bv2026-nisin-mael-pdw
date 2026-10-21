import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '@core/account';
import {
  AuthIdentifierEntity,
  PasswordCredentialEntity,
  AuthSessionEntity,
  AuthRefreshTokenEntity,
} from './data';

@Module({
  imports: [
    AccountModule,
    TypeOrmModule.forFeature([
      AuthIdentifierEntity,
      PasswordCredentialEntity,
      AuthSessionEntity,
      AuthRefreshTokenEntity,
    ]),
  ],
})
export class AuthModule {}
