import { HttpStatus, HttpException } from '@nestjs/common';
import { ApiValidationError } from '@common/api/data/model/api-validation-error';
import { ApiCodeResponse } from '@common/api/data/enum/api-code-response.enum';
import { ApiResponse } from '@common/api/data/model/api-response';

export type ApiExceptionOptions<T = unknown> = {
  statusCode?: HttpStatus;
  code?: string;
  data?: T | null;
  validationErrors?: ApiValidationError[];
  logMessage?: string;
};
export class ApiException<T = unknown> extends HttpException {
  readonly apiCode: string;
  readonly apiData: T | null;
  readonly apiValidationErrors: ApiValidationError[];
  readonly logMessage?: string;
  constructor(options: ApiExceptionOptions<T> = {}) {
    const statusCode = options.statusCode ?? HttpStatus.BAD_REQUEST;
    const response = ApiResponse.error<T>({
      code: options.code ?? ApiCodeResponse.CommonError,
      data: options.data ?? null,
      validationErrors: options.validationErrors ?? [],
    });
    super(response, statusCode);
    this.apiCode = response.code;
    this.apiData = response.data;
    this.apiValidationErrors = response.validationErrors;
    this.logMessage = options.logMessage;
  }
}
