import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './core/constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  getHello(): string {
    return this.appService.getHello();
  }
}
