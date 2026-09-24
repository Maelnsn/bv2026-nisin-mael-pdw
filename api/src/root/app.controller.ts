import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiSuccessCode } from '@common/api';
import { ApiCodeResponse } from '@common/api/data/enum/api-code-response.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiSuccessCode(ApiCodeResponse.CommonSuccess)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('Hello-v2')
  @ApiSuccessCode(ApiCodeResponse.CommonSuccess)
  getHellov2(): string {
    return this.appService.getHello();
  }
}
