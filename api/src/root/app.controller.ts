import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from '@root/app.service';
import { ApiSuccessCode, SkipApiTransform } from '@common/api/decorator';
import { ApiCodeResponse } from '@common/api/data/enum/api-code-response.enum';
import { ApiException, ValidationException } from '@common/api/data/exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiSuccessCode(ApiCodeResponse.CommonSuccess)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello-v2')
  @SkipApiTransform()
  getHelloV2(): string {
    return this.appService.getHello();
  }

  @Get('hello-v3')
  getHelloV3(): string {
    throw new ApiException({ statusCode: HttpStatus.BAD_GATEWAY });
    return 'test';
  }

  @Get('hello-v4')
  getHelloV4(): string {
    throw new ValidationException([]);
    return 'test';
  }
}
