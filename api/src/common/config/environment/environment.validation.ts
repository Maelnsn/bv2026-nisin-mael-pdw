import { z } from 'zod';
import { AppMode, LogLevel } from '../data/enum';

const booleanFromStringSchema = z
  .enum(['true', 'false'])
  .transform((value) => value === 'true');
const nonEmptyStringSchema = z.string().trim().min(1);

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

const environmentSchema = z
  .object({
    APP_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    NODE_ENV: appModeSchema,
    APP_NAME: nonEmptyStringSchema,
    LOG_LEVEL: z.nativeEnum(LogLevel),
    DB_SYNC: booleanFromStringSchema,
    AUTH_PASSWORD_MIN_LENGTH: z.coerce.number().int().min(1).default(15),
    AUTH_SESSION_ABSOLUTE_TTL_SECONDS: z.coerce.number().int().min(1),
    AUTH_REFRESH_TOKEN_TTL_SECONDS: z.coerce.number().int().min(1),
  })
  .superRefine((environment, context) => {
    if (environment.NODE_ENV === AppMode.Prod && environment.DB_SYNC) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['DB_SYNC'],
        message: 'DB_SYNC=true is not allowed in production',
      });
    }
    if (
      environment.AUTH_REFRESH_TOKEN_TTL_SECONDS >
      environment.AUTH_SESSION_ABSOLUTE_TTL_SECONDS
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['AUTH_REFRESH_TOKEN_TTL_SECONDS'],
        message: 'Refresh token TTL cannot exceed absolute session TTL',
      });
    }
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
