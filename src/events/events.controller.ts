import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(
      createEventDto.event,
      createEventDto.doctorId,
      createEventDto.clinicId,
    );
  }

  @Get()
  findAll(
    @Query('doctorId') doctorId: string,
    @Query('clinicId') clinicId: string,
  ) {
    return this.eventsService.findAll(doctorId, clinicId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
