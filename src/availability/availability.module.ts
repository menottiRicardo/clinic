import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Availability, AvailabilitySchema } from './availability.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Availability.name, schema: AvailabilitySchema }],
      'appointment',
    ),
  ],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}
