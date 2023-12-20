import { Injectable } from '@nestjs/common';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './appointments.schema';
import { Model } from 'mongoose';
import { Event } from 'src/events/events.schema';
import { Availability } from 'src/availability/availability.schema';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { UsersService } from 'src/users/users.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name, 'appointment')
    private appointments: Model<Appointment>,
    @InjectModel(Event.name, 'appointment') private events: Model<Event>,
    @InjectModel(Availability.name, 'appointment')
    private availability: Model<Availability>,
    private readonly usersService: UsersService,
  ) {}
  create(appointment: CreateAppointmentDto, patientId: string) {
    // create the end date and start date
    // save to db
    // send email
    return this.appointments.create(appointment);
  }

  findAll(userId: string) {
    return `This action returns all appointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }

  async findScheduleInfo(doctorId: string, clinicId: string) {
    // find all the events for a given doctor
    const events = await this.events.find({ doctorId, clinicId });

    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    const availability: Availability = await this.availability.findOne({
      doctorId,
    });

    const rawAppointments = await this.appointments.find({
      doctorId,
      clinicId,
    });
    const appointments = rawAppointments.map((appt) => {
      return {
        ...appt,
        eventId: appt.eventId,
        startDate: dayjs(appt.startDate).tz('America/Panama').format(),
        endDate: dayjs(appt.endDate).tz('America/Panama').format(),
      };
    });
    const daysOff = [];

    days.forEach((day) => {
      if (!availability[day].available) {
        daysOff.push(days.indexOf(day));
      }
    });

    const { doc, clinic } = await this.usersService.findDocInfo(
      doctorId,
      clinicId,
    );

    const doctor = {
      name: doc.firstName + ' ' + doc.lastName,
      _id: doc._id,
      clinic: {
        name: clinic.name,
        _id: clinic._id,
      },
    };
    return { events, availability, appointments, daysOff, doctor };
  }
}
