import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '@common/config/app-config.module';
import { HealthModule } from '@core/health';
import { LoggingModule } from '@common/logging/logging-module';

@Module({})
export class AppModule {
  static register(): DynamicModule {
    return {
      module: AppModule,
      imports: [AppConfigModule.register(), HealthModule, LoggingModule],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
