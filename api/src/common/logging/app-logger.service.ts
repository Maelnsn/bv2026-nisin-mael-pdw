/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, Scope } from '@nestjs/common';
import { LogCategory } from '@common/logging/data/enum/log-category.enum';
import { LogLevel } from '@common/config/data/enum';
import { PinoLogger } from 'nestjs-pino';

export type StructuredLogFields = Record<string, unknown> & {
  event: string;
};

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger {
  constructor(private readonly pinoLogger: PinoLogger) {}
  setContext(context: string): void {
    this.pinoLogger.setContext(context);
  }

  application(fields: StructuredLogFields): void {
    this.write(LogCategory.Application, LogLevel.Info, fields);
  }

  security(fields: StructuredLogFields): void {
    this.write(LogCategory.Security, LogLevel.Warn, fields);
  }

  audit(fields: StructuredLogFields): void {
    this.write(LogCategory.Audit, LogLevel.Info, fields);
  }

  private write(
    category: LogCategory,
    level: LogLevel,
    fields: StructuredLogFields,
  ): void {
    this.pinoLogger[level]({ category, ...fields }, fields.event);
  }
}
