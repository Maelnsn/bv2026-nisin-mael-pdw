import { ApiCodeResponse } from '@common/api/data/enum/api-code-response.enum';
import { ApiException } from '@common/api/data/exception';
import { ULID_REGEX } from '@common/database';
import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseUlidPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (typeof value !== 'string' || !ULID_REGEX.test(value)) {
      throw new ApiException({
        statusCode: HttpStatus.BAD_REQUEST,
        code: ApiCodeResponse.CommonInvalidIdentifier,
        logMessage: `Invalid ULID for parameter "${metadata.data ?? 'unknown'}"`,
      });
    }
    return value;
  }
}
