import { z } from 'zod';
import { AppMode } from '../data/enum';

//const booleanFromStringSchema = z
// .enum(['true', 'false'])
// .transform((value) => value === 'true');
//const nonEmptyStringSchema = z.string().trim().min(1);

const appModeSchema = z
  .enum(['DEV', 'TEST', 'PROD', 'development', 'test', 'production'])
  .transform((value) => {
    if (value === 'development') {
      return AppMode.Dev;
    }

    if (value === 'test') {
      return AppMode.Test;
    }

    if (value === 'production') {
      return AppMode.Prod;
    }

    return value as AppMode;
  });

const environmentSchema = z.object({
  APP_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  NODE_ENV: appModeSchema,
  //APP_NAME: nonEmptyStringSchema,
  //LOG_LEVEL: z.nativeEnum(LogLevel),
  //DB_SYNC: booleanFromStringSchema,
  AUTH_PASSWORD_MIN_LENGTH: z.coerce.number().int().min(1).default(15),
});

export type ValidatedEnvironment = z.infer<typeof environmentSchema>;

export const validateEnvironment = (
  config: Record<string, unknown>,
): ValidatedEnvironment => {
  const result = environmentSchema.safeParse(config);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');

    throw new Error(`Invalid environment configuration: ${message}`);
  }

  return result.data;
};
