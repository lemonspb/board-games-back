import { Test, TestingModule } from '@nestjs/testing';
import { GameEventsService } from './gameEvents.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GameEvents } from './entity/gameEvents.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

const mockEvent: GameEvents = {
  id: 10,
  title: 'Board Game Night',
  description: 'Играем в настолки',
  event_date: new Date('2025-02-05'),
  participants: [{ id: 'abc123', name: 'Иван Петров' }],
  count: 1,
  location: 'Москва',
  is_public: true,
  is_finished: false,
  board_games: [1, 2, 3],
  created_at: new Date(),
  updated_at: new Date(),
};

const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

describe('GameEventsService', () => {
  let service: GameEventsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<GameEvents>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameEventsService,
        { provide: getRepositoryToken(GameEvents), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<GameEventsService>(GameEventsService);
    repository = module.get<Repository<GameEvents>>(
      getRepositoryToken(GameEvents),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  // 📌 Тест метода createEvent
  it('должен вернуть созданное мероприятие', async () => {
    const createdEvent = {
      id: 1,
      title: 'Board Game Night',
      description: 'Играем в настолки',
      event_date: new Date('2025-02-05'),
      participants: [],
      count: 0,
    };

    mockRepository.save.mockResolvedValue(createdEvent);
    const result = await service.createEvent(
      '2025-02-05',
      0,
      'Играем в настолки',
      'Board Game Night',
    );
    expect(result).toEqual(createdEvent);
    expect(mockRepository.save).toHaveBeenCalledWith({
      count: 0,
      event_date: '2025-02-05',
      description: 'Играем в настолки',
      title: 'Board Game Night',
    });
  });

  // 📌 Тест метода getEvent
  it('должен вернуть мероприятие по ID', async () => {
    mockRepository.findOne.mockResolvedValue(mockEvent);

    const result = await service.getEvent(10);

    expect(result).toEqual(mockEvent);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 10 } });
  });

  it('должен выбросить NotFoundException, если мероприятие не найдено', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.getEvent(99)).rejects.toThrow(NotFoundException);
  });

  // 📌 Тест метода joinEvent
  it('должен добавить участника, если его ещё нет', async () => {
    const updatedEvent = {
      ...mockEvent,
      participants: [
        ...mockEvent.participants,
        { id: 'xyz789', name: 'Андрей Смирнов' },
      ],
      count: 2,
    };
    mockRepository.findOne.mockResolvedValue(mockEvent);
    mockRepository.save.mockResolvedValue(updatedEvent);

    const result = await service.joinEvent(10, 'Андрей Смирнов');

    expect(result.participantId).toBeDefined();
    expect(result.participants.length).toBe(2);
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('не должен добавлять участника повторно', async () => {
    mockRepository.findOne.mockResolvedValue(mockEvent);

    const result = await service.joinEvent(10, 'Иван Петров');

    expect(result.message).toBe('Вы уже записаны!');
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  // 📌 Тест метода leaveEvent
  it('должен удалить участника по participantId', async () => {
    const eventCopy = { ...mockEvent }; // Создаём копию объекта
    eventCopy.participants = [{ id: 'abc123', name: 'Иван Петров' }]; // Убеждаемся, что есть участник

    mockRepository.findOne.mockResolvedValue(eventCopy);
    mockRepository.save.mockResolvedValue({
      ...eventCopy,
      participants: [],
      count: 0,
    });

    const result = await service.leaveEvent(10, 'abc123');

    expect(result.participants.length).toBe(0);
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('должен выбросить BadRequestException, если participantId неверный', async () => {
    mockRepository.findOne.mockResolvedValue(mockEvent);

    await expect(service.leaveEvent(10, 'wrong-id')).rejects.toThrow(
      BadRequestException,
    );
  });
});
