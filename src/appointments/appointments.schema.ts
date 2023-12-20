import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMon } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop()
  clinicId: SchemaMon.Types.ObjectId;

  @Prop()
  patientId: SchemaMon.Types.ObjectId;

  @Prop()
  doctorId: SchemaMon.Types.ObjectId;

  @Prop()
  startDate: Date;

  @Prop()
  eventId: SchemaMon.Types.ObjectId;

  @Prop()
  endDate: Date;

  _id: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
