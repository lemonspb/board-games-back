import { Controller, Post, Body } from '@nestjs/common';
import { GameEventsService } from './gameEvents.service';
import { CreateEventDto } from './dto/gameEvents.dto';
import { GameEvents } from './entity/gameEvents.entity';

@Controller('events')
export class GameEventsController {
  constructor(private readonly gameEventsService: GameEventsService) {}

  @Post('create')
  async createEvent(
    @Body() { date, count, description, title, participants }: CreateEventDto,
  ): Promise<GameEvents> {
    return this.gameEventsService.createEvent(
      date,
      count,
      description,
      title,
      participants,
    );
  }
}
