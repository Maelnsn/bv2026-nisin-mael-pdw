import { LogLevel } from '../config/data/enum/log-level.enum';

const HEALTH_CHECK_LOG_PATHS = new Set(['/health/live', '/health/ready']);

export const resolveHttpLogLevel = (
  path: string | undefined,
  statusCode: number,
  hasError: boolean,
): LogLevel => {
  const normalizedPath = path?.split('?')[0];
  if (
    !hasError &&
    statusCode < 400 &&
    normalizedPath !== undefined &&
    HEALTH_CHECK_LOG_PATHS.has(normalizedPath)
  ) {
    return LogLevel.Silent;
  }
  if (hasError || statusCode >= 500) return LogLevel.Error;
  if (statusCode >= 400) return LogLevel.Warn;
  return LogLevel.Info;
};
