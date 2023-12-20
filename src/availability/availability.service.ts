import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Availability } from './availability.schema';
import { Model } from 'mongoose';
@Injectable()
export class AvailabilityService {
  constructor(
    @InjectModel(Availability.name, 'appointment')
    private availability: Model<Availability>,
  ) {}
  create(availability: Availability) {
    return this.availability.create(availability);
  }

  findAll() {
    return `This action returns all availability`;
  }

  getAvailability(doctorId: string, clinicId: string) {
    return this.availability.findOne({ clinicId, doctorId });
  }

  update(doctorId: string, clinicId: string, availability: Availability) {
    return this.availability.updateOne({ doctorId, clinicId }, availability);
  }

  remove(id: number) {
    return `This action removes a #${id} availability`;
  }
}
