import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { Clinic } from './clinic.schema';
import { Sidebar } from 'src/core/types/sidebar';
import { adminSidebar, doctorSidebar } from 'src/core/constants';
import { SignUpUser } from 'src/auth/auth.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private users: Model<User>,
    @InjectModel(Clinic.name) private clinics: Model<Clinic>,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.users.findOne({ username }).exec();
  }

  async findUserById(id: string): Promise<User> {
    return this.users.findOne({ _id: id });
  }

  async findClinicById(id: string): Promise<Clinic> {
    return this.clinics.findOne({ _id: id });
  }

  async saveUserToClinic(clinicId: string, userId: string): Promise<Clinic> {
    const clinic = await this.clinics.findOneAndUpdate(
      { _id: clinicId },
      { $push: { users: userId } },
    );

    return clinic;
  }

  async findDocInfo(docId: string, clinicId: string) {
    const doc = await this.users.findOne({ _id: docId });
    const clinic = await this.clinics.findOne({ _id: clinicId });
    return { doc, clinic };
  }

  async create(user: SignUpUser) {
    const createdUser = new this.users(user);
    return createdUser.save();
  }

  async createClinic(clinic: Clinic) {
    const createdClinic = new this.clinics(clinic);
    return createdClinic.save();
  }

  async createSidebar(user: User): Promise<Sidebar[]> {
    const sidebar: Sidebar[] = [];
    if (user.role === 'DOCTOR') {
      sidebar.push(...doctorSidebar);
    } else if (user.role === 'ADMIN') {
      // get classrooms

      sidebar.push(...adminSidebar);
    }
    return sidebar;
  }
}
