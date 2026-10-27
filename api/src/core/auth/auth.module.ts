import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '@core/account';
import {
  AuthIdentifierService,
  PasswordCredentialService,
  PasswordHasherService,
  PasswordPolicyService,
  AuthCookieService,
  CsrfService,
  TokenCryptoService,
  RefreshTokenService,
  AuthSessionService,
} from './service';
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
  providers: [
    AuthIdentifierService,
    PasswordCredentialService,
    PasswordHasherService,
    PasswordPolicyService,
    AuthCookieService,
    CsrfService,
    TokenCryptoService,
    RefreshTokenService,
    AuthSessionService,
  ],
})
export class AuthModule {}
