import { Test, TestingModule } from '@nestjs/testing';
import { BggController } from './bgg.controller';
import { BggService } from './bgg.service';
import { BggRanks } from './entity/rank.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('BggController', () => {
  let bggController: BggController;
  let bggRepository: Repository<BggRanks>;
  beforeEach(async () => {
    const bgg: TestingModule = await Test.createTestingModule({
      controllers: [BggController],

      providers: [
        BggService,
        {
          provide: getRepositoryToken(BggRanks),
          useValue: {},
        },
      ],
    }).compile();

    bggController = bgg.get<BggController>(BggController);
  });

  describe('bgg', () => {
    it('should return  data', async () => {
      const result = {
        data: [
          {
            name: 'Бумажные кварталы',
            id: '233867',
            yearpublished: '2018',
          },
          {
            name: 'Бумажные кварталы. Коллекционное издание',
            id: '392449',
            yearpublished: '2023',
          },
        ],
      };
      expect(
        await bggController.search({
          query: 'бумажные кварталы',
        }),
      ).toStrictEqual(result);
    });
  });
});
