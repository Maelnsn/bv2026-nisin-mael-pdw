import { DynamicModule, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HealthModule } from '@core/health/health.module.js';
import { EnvService } from 'src/common/config/env.service.js';
import { AppConfigModule } from 'src/common/config/app-config.module.js';

@Module({})
export class AppModule {
  static register(): DynamicModule {
    return {
      module: AppModule,
      imports: [AppConfigModule.register(), HealthModule],
    };
  }
}

const app = await NestFactory.create<NestExpressApplication>(AppModule);

const envService = app.get(EnvService);
await app.listen(envService.appPort);
