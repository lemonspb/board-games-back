import { Injectable } from '@nestjs/common';
import { axiosBgg } from './helpers/axios';
import { Repository } from 'typeorm';
import { BggRanks } from './entity/rank.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BggSearchList } from './types/responces/Search';
import { SearchInitialResponse } from './types/initialBggResponces/SearchInitialResponse';
import { removeAllTagsFromString } from './helpers/removeAllTagsFromString';
import { translatteText } from './helpers/translatteText';
import { BoardgameInitialResponse } from './types/initialBggResponces/BoardgameInitialResponse';
import { BggGetByIdResponse } from './types/responces/GetById';
@Injectable()
export class BggService {
  @InjectRepository(BggRanks)
  private bggRepository: Repository<BggRanks>;
  async searchGame(gameName: string): Promise<BggSearchList> {
    const res = await axiosBgg.get(`/search?query=${gameName}&type=boardgame`);

    const json: SearchInitialResponse = JSON.parse(res.data);

    return {
      data: json.items.item.map(({ _attributes, yearpublished, name }) => {
        return {
          name: name._attributes.value,
          id: _attributes.id,
          yearpublished: yearpublished._attributes.value,
        };
      }),
    };
  }
  async getById(id: number): Promise<BggGetByIdResponse> {
    const res = await axiosBgg.get(`/boardgame/${id}`, {
      baseURL: 'https://api.geekdo.com/xmlapi/',
    });
    const { boardgamges }: BoardgameInitialResponse = JSON.parse(res.data);
    const { boardgame } = boardgamges;
    const translatedDescription = await translatteText(
      removeAllTagsFromString(boardgame.description._text),
    );
    return {
      id: id,
      age: boardgame.age._text,
      description: translatedDescription,
      image: boardgame.image._text,
      thumbnail: boardgame.thumbnail._text,
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

  async getByRank(rank: number): Promise<any> {
    return await this.bggRepository.find({
      where: {
        rank: rank,
      },
    });
  }
}
