import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/core/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Public()
  @Post('sign-up')
  async signup(@Body() body) {
    return this.authService.signup(body);
  }

  @MessagePattern('validate_token')
  public async getUserByAccessToken(@Payload() token: string) {
    const isValid = await this.authService.validateToken(token);
    return isValid;
  }
}
