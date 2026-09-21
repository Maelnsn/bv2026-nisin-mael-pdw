/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable @typescript-eslint/no-unsafe-member-access /
// eslint-disable @typescript-eslint/no-unsafe-argument /
import { EnvService } from '@common/config/env.service';
import { Global, Module, RequestMethod } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { LOG_REDACTION_PATHS } from './logging-redaction';
import {
  REQUEST_ID_HEADER,
  REQUEST_ID_RESPONSE_HEADER,
  resolveRequestId,
} from './request-id.util';
import { resolveHttpLogLevel } from './http-log-level-util';
import { AppLogger } from './app-logger.service';

@Global()
@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        pinoHttp: {
          level: envService.logLevel,
          redact: {
            paths: LOG_REDACTION_PATHS,
            censor: '[REDACTED]',
          },
          autoLogging: !envService.isTest,
          genReqId: (request, response) => {
            const requestId = resolveRequestId(
              request.headers[REQUEST_ID_HEADER],
            );
            response.setHeader(REQUEST_ID_RESPONSE_HEADER, requestId);
            return requestId;
          },
          quietReqLogger: true,
          customAttributeKeys: { reqId: 'requestId' },
          customLevels: (request, response, error) =>
            resolveHttpLogLevel(
              request.url,
              response.statusCode,
              Boolean(error),
            ),
        },
        forRoutes: [{ path: '{path}', method: RequestMethod.ALL }],
      }),
    }),
  ],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggingModule {}
