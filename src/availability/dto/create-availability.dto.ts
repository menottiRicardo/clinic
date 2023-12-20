import { Availability } from '../availability.schema';

export class CreateAvailabilityDto {
  doctorId: string;
  clinicId: string;
  availability: Availability;
}
