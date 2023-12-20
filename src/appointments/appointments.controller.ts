import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Public } from 'src/core/constants';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UsersService } from 'src/users/users.service';
import { SignUpUser } from 'src/auth/auth.types';
import { PatientService } from 'src/patient/patient.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly userService: UsersService,
    private readonly patientService: PatientService,
  ) {}

  @Public()
  @Post('schedule')
  async create(@Body() appt: CreateAppointmentDto) {
    //  first check if the user exists
    let user = await this.userService.findUserByCid(appt.cid);
    let patient = await this.patientService.findOneByCid(appt.cid);

    // if not create the user
    if (!user) {
      const newUserInfo: SignUpUser = {
        cid: appt.cid,
        username: appt.cid,
        firstName: appt.name,
        password: 'password',
      };
      const patientInfo = {
        cid: appt.cid,
        clinics: [appt.clinicId],
      };
      user = await this.userService.create(newUserInfo);
      patient = await this.patientService.create(patientInfo);
    }

    // add clinic to user
    // then save the appointment
    return this.appointmentsService.create(appt, patient._id);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.appointmentsService.findAll(req.user._id);
  }

  @Public()
  @Get('schedule')
  findScheduleInfo(
    @Query('doctorId') doctorId: string,
    @Query('clinicId') clinicId: string,
  ) {
    return this.appointmentsService.findScheduleInfo(doctorId, clinicId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
