import z from "zod"
import { LogLevel } from "../data/enum/log-level.enum.js"
import { AppMode } from "../data/enum/app-mode.enum.js"

const booleanFromStringSchema = z
    .enum(['true', 'false'])
    .transform((value) => value === 'true');

const nonEmptyStringSchema = z.string().trim().min(1);

const corsOriginSchema = z.string().min(1);

const environmentSchema = z
    .object({
        NODE_ENV: AppMode,
        APP_NAME: nonEmptyStringSchema,
        APP_PORT: z.coerce.number().int().min(1).max(65535),
        APP_CORS_ORIGIN: corsOriginSchema,
        LOG_LEVEL: z.nativeEnum(LogLevel),
        DB_SYNC: booleanFromStringSchema,
        AUTH_PASSWORD_MIN_LENGTH: z.coerce.number().int().min(1).default(15),
        AUTH_PASSWORD_MAX_LENGTH: z.coerce.number().int().min(1).default(100),
        AUTH_PASSWORD_RESET_TOKEN_EXPIRATION: z.coerce.number().int().min(1).default(3600),
        AUTH_ACCESS_TOKEN_EXPIRATION: z.coerce.number().int().min(1).default(900),
        AUTH_REFRESH_TOKEN_EXPIRATION: z.coerce.number().int().min(1).default(604800),
        AUTH_JWT_SECRET: nonEmptyStringSchema,
        AUTH_JWT_REFRESH_SECRET: nonEmptyStringSchema,
        AUTH_JWT_ISSUER: nonEmptyStringSchema,
        AUTH_JWT_AUDIENCE: nonEmptyStringSchema,
        AUTH_REFRESH_TOKEN_TTL_SECONDS: z.coerce.number().int().min(1).default(604800),
        AUTH_SESSION_ABSOLUTE_TTL_SECONDS: z.coerce.number().int().min(1).default(604800),
        DB_HOST: nonEmptyStringSchema,
        DB_PORT: z.coerce.number().int().min(1).max(65535),
        DB_USERNAME: nonEmptyStringSchema,
        DB_PASSWORD: nonEmptyStringSchema,
        DB_NAME: nonEmptyStringSchema,
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
        } 0
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

//Merci GPT
