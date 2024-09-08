import { Injectable } from '@nestjs/common';
import { axiosBgg } from '@/bgg/helpers/axios';
import { Repository } from 'typeorm';
import { BggRanks } from './bgg.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BggService {
  @InjectRepository(BggRanks)
  private bggRepository: Repository<BggRanks>;
  async searchGame(gameName: string): Promise<any> {
    const res = await axiosBgg.get(`/search?query=${gameName}&type=boardgame`);
    const json = JSON.parse(res.data);

    return {
      data: json.items.item.map(({ _attributes, yearpublished, name }) => {
        return {
          name: name?._attributes.value,
          id: _attributes?.id,
          yearpublished: yearpublished?._attributes.value,
        };
      }),
      json,
    };
  }
  async getById(id: number): Promise<any> {
    const res = await axiosBgg.get(`/boardgame/${id}`, {
      baseURL: 'https://api.geekdo.com/xmlapi/',
    });
    const json = JSON.parse(res.data);
    console.log(json.boardgames.boardgame);
    return {
      age: json.boardgames.boardgame.age._text,
      description: json.boardgames.boardgame.description._text,
      id: id,
    };
  }

  async getAll(): Promise<any> {
    const [data, total] = await this.bggRepository.findAndCount({
      take: 10,
      skip: 0,
    });

    const fullData = await Promise.all(
      data.map(async (res) => {
        try {
          let { age, description } = await this.getById(res.id);
          return {
            age: age,
            description: description,
            ...res,
          };
        } catch (error) {
          return error;
        }
      }),
    );

    return {
      data: fullData,
      count: total,
    };
  }

  async getByRank(rank): Promise<any> {
    return await this.bggRepository.find({
      where: {
        rank: rank,
      },
    });
  }
}
