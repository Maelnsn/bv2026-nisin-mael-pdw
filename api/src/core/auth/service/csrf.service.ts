import { Injectable } from '@nestjs/common';
import { TokenCryptoService } from './token-crypto.service';
import { AuthSessionEntity } from '../data/entity';
import { AuthSecurityException } from '../data/exception';
import { Request } from 'express';
import { timingSafeEqual } from 'node:crypto';

@Injectable()
export class CsrfService {
  constructor(private readonly tokenCrypto: TokenCryptoService) {}
  assertValid(request: Request, session: AuthSessionEntity): void {
    const token = request.header('X-CSRF-Token');
    if (!token || token.length > 512) {
      throw new AuthSecurityException('api.security.csrf-invalid', 403);
    }
    const actual = Buffer.from(this.tokenCrypto.fingerprint(token), 'hex');
    const expected = Buffer.from(session.csrfTokenHash, 'hex');
    if (
      actual.length !== expected.length ||
      !timingSafeEqual(actual, expected)
    ) {
      throw new AuthSecurityException('api.security.csrf-invalid', 403);
    }
  }
}
