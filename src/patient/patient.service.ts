import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from './patient.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name, 'appointment') private patients: Model<Patient>,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    return this.patients.create(createPatientDto);
  }

  findAll() {
    return `This action returns all patient`;
  }

  async findOneByCid(cid: string): Promise<Patient> {
    return this.patients.findOne({ cid });
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
