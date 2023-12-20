import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './appointments.schema';

import { Event, EventSchema } from 'src/events/events.schema';
import {
  Availability,
  AvailabilitySchema,
} from 'src/availability/availability.schema';
import { UsersModule } from 'src/users/users.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Appointment.name, schema: AppointmentSchema }],
      'appointment',
    ),
    MongooseModule.forFeature(
      [{ name: Event.name, schema: EventSchema }],
      'appointment',
    ),
    MongooseModule.forFeature(
      [{ name: Availability.name, schema: AvailabilitySchema }],
      'appointment',
    ),
    UsersModule,
    PatientModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
