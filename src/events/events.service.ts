import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './events.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name, 'appointment') private events: Model<Event>,
  ) {}
  create(event: Event, doctorId: string, clinicId: string) {
    return this.events.create({
      ...event,
      doctorId,
      clinicId,
    });
  }

  findAll(doctorId: string | undefined, clinicId: string) {
    if (doctorId) {
      // find all events for a doctor and a clinic
      return this.events.find({ doctorId, clinicId });
    }
    return this.events.find({ clinicId });
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  remove(id: string): any {
    return this.events.deleteOne({ _id: id });
  }
}
