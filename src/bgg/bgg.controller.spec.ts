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

  describe('/search', () => {
    test('should return data', async () => {
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

    it('should return empty array', async () => {
      expect(
        await bggController.search({
          query: undefined,
        }),
      ).toStrictEqual({ data: [] });
    });
  });

  describe('/getById', () => {
    test('should return data', async () => {
      const result = {
        id: 15,
        age: '12',
        description:
          'y Запрос от антазий световой эймс Орд Эйк перечисляет различные издания Osmic ncounter в отдельных записях Ach Edition - та же игра в своей основе, но функции совместимых расширения и производство различаются среди них, его запись для оригинального 1977 года на версиях. которые стремятся распространить себя на пять зарубежных миров o выполнить это, они ставят вызовы против других игроков и заручиться помощи заинтересованных сторон. До тех пор, пока один игрок не занял пять планет в других системах, чтобы выиграть победы.',
        image:
          'https://cf.geekdo-images.com/-h1dJq8he4yvRG7rRzF-nQ__original/img/Acu3-TEjeRexlWAGcp1vwYV9et4=/0x0/filters:format(jpeg)/pic428608.jpg',
        thumbnail:
          'https://cf.geekdo-images.com/-h1dJq8he4yvRG7rRzF-nQ__thumb/img/eAwlQGfEMd4JICzJcqc5A9o4x8w=/fit-in/200x150/filters:strip_icc()/pic428608.jpg',
      };

      expect(
        await bggController.getById({
          id: 15,
        }),
      ).toEqual(result);
    });

    it('should return empty object', async () => {
      expect(
        await bggController.getById({
          id: undefined,
        }),
      ).toEqual({});
    });
  });
});
