import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { GameEventsService } from './gameEvents.service';
import { CreateEventDto, AddBoardGameDto } from './dto/gameEvents.dto';
import { GameEvents } from './entity/gameEvents.entity';

@Controller('events')
export class GameEventsController {
  constructor(private readonly gameEventsService: GameEventsService) {}

  @Post('create')
  async createEvent(
    @Body() { eventDate, count, description, title }: CreateEventDto,
  ): Promise<GameEvents> {
    console.log(eventDate, count, description, title);
    return this.gameEventsService.createEvent(
      eventDate,
      count,
      description,
      title,
    );
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

  @Patch(':id/board-games')
  async addBoardGame(
    @Param('id', ParseIntPipe) id: number,
    @Body() addBoardGameDto: AddBoardGameDto,
  ) {
    return this.gameEventsService.addBoardGameToEvent(
      id,
      addBoardGameDto.gameId,
    );
  }
}
