import { ApiException } from './api-exception';
import { ApiValidationError } from '@common/api/data/model/api-validation-error';
import { HttpStatus } from '@nestjs/common';
import { ApiCodeResponse } from '@common/api/data/enum/api-code-response.enum';
import { ValidationError } from '@nestjs/common';

export class ValidationException extends ApiException<null> {
  constructor(
    validationErrors: ApiValidationError[],
    statusCode: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super({
      statusCode,
      code: ApiCodeResponse.CommonValidationError,
      data: null,
      validationErrors,
      logMessage: 'Request validation failed',
    });
  }
  private static toMachineReadableMessage(
    constraint: string,
    message: string,
  ): string {
    if (message.startsWith('api.')) {
      return message;
    }

    const kebabConstraint = constraint
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/_/g, '-')
      .toLowerCase();

    return `api.common.validation.error.${kebabConstraint}`;
  }

  static fromClassValidatorErrors(
    errors: ValidationError[],
    statusCode: HttpStatus,
  ): ValidationException {
    return new ValidationException(
      errors.map((error) => ValidationException.mapValidationError(error)),
      statusCode,
    );
  }
  private static mapValidationError(
    error: ValidationError,
  ): ApiValidationError {
    const children = error.children?.map((child) =>
      ValidationException.mapValidationError(child),
    );
    return {
      property: error.property,
      messages: Object.entries(error.constraints ?? {}).map(
        ([constraint, message]) =>
          ValidationException.toMachineReadableMessage(constraint, message),
      ),
      ...(children?.length ? { children } : {}),
    };
  }
}
