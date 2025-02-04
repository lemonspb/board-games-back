import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { GameEvents } from './entity/gameEvents.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GameEventsService {
  @InjectRepository(GameEvents)
  private gameEventsRepository: Repository<GameEvents>;

  async createEvent(
    eventDate: string,
    count: number,
    description: string,
    title: string,
  ): Promise<GameEvents> {
    const newEvent = await this.gameEventsRepository.save({
      event_date: eventDate,
      count,
      description,
      title,
    });

    return newEvent;
  }
  async getEvent(id: number) {
    const event = await this.gameEventsRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Мероприятие не найдено');
    return event;
  }

  async joinEvent(id: number, name: string) {
    const event = await this.getEvent(id);

    // Проверяем, есть ли уже такой участник
    if (event.participants.some((p) => p.name === name)) {
      return { message: 'Вы уже записаны!' };
    }

    // Добавляем участника
    const participant = { id: uuidv4(), name };
    event.participants.push(participant);
    event.count = event.participants.length;
    await this.gameEventsRepository.save(event);

    return {
      message: 'Вы успешно записались!',
      participantId: participant.id,
      participants: event.participants,
    };
  }

  async leaveEvent(id: number, participantId: string) {
    const event = await this.getEvent(id);

    const participantIndex = event.participants.findIndex(
      (p) => p.id === participantId,
    );
    if (participantIndex === -1)
      throw new BadRequestException('Неверный participantId');

    // Удаляем участника
    event.participants.splice(participantIndex, 1);
    event.count = event.participants.length;
    await this.gameEventsRepository.save(event);

    return {
      message: 'Вы удалили себя из списка участников',
      participants: event.participants,
    };
  }
}
