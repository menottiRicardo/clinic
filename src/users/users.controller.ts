import { Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from './users.schema';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @MessagePattern('get_user_by_id')
  public async getUserById(@Payload() data: string): Promise<User> {
    const userId = data;
    return this.usersService.findUserById(userId);
  }

  @MessagePattern('get_doc_by_id')
  public async getDocInfo(
    @Payload() data: { doctorId: string; clinicId: string },
  ) {
    const { doctorId, clinicId } = data;
    const docInfo = await this.usersService.findDocInfo(doctorId, clinicId);
    return docInfo;
  }

  @Post('clinic')
  createClinic(@Request() req) {
    return this.usersService.createClinic(req.body);
  }

  @Get('sidebar')
  getSidebar(@Request() req) {
    return this.usersService.createSidebar(req.user);
  }
}
