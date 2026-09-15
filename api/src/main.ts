import { EnvService } from '@common/config/env.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@root/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import { AppLogger } from '@common/logging/app-logger.service';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.register(),
    {
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();

  const envService: EnvService = app.get(EnvService);
  await app.listen(envService.appPort);

  const appLogger = await app.resolve(AppLogger);
  appLogger.setContext('Bootstrap');
  appLogger.application({
    event: 'application.started',
    port: envService.appPort,
  });
};

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
