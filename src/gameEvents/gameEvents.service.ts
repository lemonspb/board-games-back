import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { GameEvents } from './entity/gameEvents.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GameEventsService {
  @InjectRepository(GameEvents)
  private gameEventsRepository: Repository<GameEvents>;

  async createEvent(
    date: string,
    count: number,
    description: string,
    title: string,
    participants?: string[],
  ): Promise<GameEvents> {
    const newEvent = await this.gameEventsRepository.save({
      date,
      count,
      description,
      title,
      participants,
    });
    return newEvent;
  }
}
