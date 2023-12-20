import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMon } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  description: string;

  @Prop()
  title: string;

  @Prop({ index: true })
  doctorId: SchemaMon.Types.ObjectId;

  @Prop({ index: true })
  clinicId: SchemaMon.Types.ObjectId;

  @Prop()
  duration: string;

  _id: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
