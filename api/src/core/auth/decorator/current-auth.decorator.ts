import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthContext } from '../data/model/auth-context';
import { Request } from 'express';

export const CurrentAuth = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthContext => {
    const request = context
      .switchToHttp()
      .getRequest<Request & { auth?: AuthContext }>();
    if (!request.auth) {
      throw new Error('Authenticated context is unavailable');
    }
    return request.auth;
  },
);
