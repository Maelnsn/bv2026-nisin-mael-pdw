import { NestFactory } from '@nestjs/core';
import { AppModule } from '@root/app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EnvService } from './common/config/env.service.js';

export const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

const app = await NestFactory.create<NestExpressApplication>(
  AppModule.register(),
);

const envService = app.get(EnvService);
await app.listen(envService.appPort);

void bootstrap();
