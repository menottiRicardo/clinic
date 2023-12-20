import { Event } from '../events.schema';

export class CreateEventDto {
  doctorId: string;
  clinicId: string;
  event: Event;
}
