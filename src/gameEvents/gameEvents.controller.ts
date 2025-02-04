import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { GameEventsService } from './gameEvents.service';
import { CreateEventDto } from './dto/gameEvents.dto';
import { GameEvents } from './entity/gameEvents.entity';

@Controller('events')
export class GameEventsController {
  constructor(private readonly gameEventsService: GameEventsService) {}

  @Post('create')
  async createEvent(
    @Body() { date, count, description, title }: CreateEventDto,
  ): Promise<GameEvents> {
    return this.gameEventsService.createEvent(date, count, description, title);
  }

  @Get(':id')
  async getEvent(@Param('id') id: number) {
    return this.gameEventsService.getEvent(id);
  }

  @Post(':id/join')
  async joinEvent(@Param('id') id: number, @Body() body: { name: string }) {
    return this.gameEventsService.joinEvent(id, body.name);
  }

  @Delete(':id/leave')
  async leaveEvent(
    @Param('id') id: number,
    @Body() body: { participantId: string },
  ) {
    return this.gameEventsService.leaveEvent(id, body.participantId);
  }
}
