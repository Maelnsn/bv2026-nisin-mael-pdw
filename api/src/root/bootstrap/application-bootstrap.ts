import { ValidationException } from '@common/api/data/exception/validation-exception';
import { HttpExceptionFilter } from '@common/api/filter/http-exception.filter';
import { ApiInterceptor } from '@common/api/interceptor/api-interceptor';
import { setupSwagger } from '@common/api/swagger/setup-swagger';
import { EnvService } from '@common/config/env.service';
import {
  INestApplication,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';

export const configureApplication = (app: INestApplication): void => {
  const envService = app.get(EnvService);
  app.setGlobalPrefix(envService.appBaseUrl, {
    exclude: [
      { path: 'health/live', method: RequestMethod.GET },
      { path: 'health/ready', method: RequestMethod.GET },
    ],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (errors) =>
        ValidationException.fromClassValidatorErrors(
          errors,
          envService.httpPayloadErrorStatusCode,
        ),
    }),
  );
  app.useGlobalFilters(app.get(HttpExceptionFilter));
  app.useGlobalInterceptors(app.get(ApiInterceptor));
  setupSwagger(app);
};
