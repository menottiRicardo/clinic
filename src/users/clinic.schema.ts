import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './users.schema';
import * as mongoose from 'mongoose';

export type ClinicDocument = HydratedDocument<Clinic>;

@Schema()
export class Clinic {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];

  _id: string;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);
