import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMon } from 'mongoose';
import { Clinic } from './clinic.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  cid: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  role: string;

  @Prop({ type: [{ type: SchemaMon.Types.ObjectId, ref: Clinic.name }] })
  clinic: Clinic[];

  _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
