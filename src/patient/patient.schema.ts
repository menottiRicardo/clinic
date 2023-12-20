import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMon } from 'mongoose';
import { Appointment } from 'src/appointments/appointments.schema';
import { Clinic } from 'src/users/clinic.schema';

export type PatientDocument = HydratedDocument<Patient>;

@Schema()
export class Patient {
  @Prop({ required: true, unique: true })
  cid: string;

  @Prop({ type: [{ type: SchemaMon.Types.ObjectId, ref: Clinic.name }] })
  clinics: Clinic[];

  _id: string;

  @Prop()
  records: Appointment[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
