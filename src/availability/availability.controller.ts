import { Controller, Get, Post, Body, Patch, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { Availability } from './availability.schema';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  create(@Body() availability: Availability) {
    return this.availabilityService.create(availability);
  }

  @Get()
  findAvailability(
    @Query('doctorId') doctorId: string,
    @Query('clinicId') clinicId: string,
  ) {
    return this.availabilityService.getAvailability(doctorId, clinicId);
  }

  @Patch()
  update(@Body() updateAvailability: UpdateAvailabilityDto) {
    return this.availabilityService.update(
      updateAvailability.doctorId,
      updateAvailability.clinicId,
      updateAvailability.availability,
    );
  }
}
