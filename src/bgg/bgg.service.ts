import { Injectable } from '@nestjs/common';
import { axiosBgg } from './helpers/axios';
import { Repository } from 'typeorm';
import { BggRanks } from './entity/rank.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchInitialResponse } from './types/initialBggResponces/SearchInitialResponse';
import { removeAllTagsFromString } from './helpers/removeAllTagsFromString';
import { translatteText } from './helpers/translatteText';
import { BoardgameInitialResponse } from './types/initialBggResponces/BoardgameInitialResponse';

import {
  BggGetAllResponse,
  BggGetByIdResponse,
  BggSearchList,
} from './types/responces';
@Injectable()
export class BggService {
  @InjectRepository(BggRanks)
  private bggRepository: Repository<BggRanks>;
  async searchGame(gameName: string): Promise<BggSearchList> {
    if (!gameName) return { data: [] };
    try {
      const res = await axiosBgg.get(
        `/search?query=${gameName}&type=boardgame`,
      );

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
    } catch (e) {
      throw new Error('API not available');
    }
  }

  async getAll(): Promise<{ data: BggGetAllResponse[]; count: number }> {
    const [data, total] = await this.bggRepository.findAndCount({
      take: 10,
      skip: 0,
    });

    try {
      const fullData = await Promise.all<BggGetAllResponse>(
        data.map(async (res) => {
          try {
            let { age, description, image, thumbnail } = await this.getById(
              res.id,
            );

            return {
              age: age,
              image: image,
              thumbnail: thumbnail,
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
    } catch (e) {
      throw new Error('API not available');
    }
  }

  async getById(id: number): Promise<Partial<BggGetByIdResponse>> {
    if (!id) return {};
    try {
      const res = await axiosBgg.get(`/boardgame/${id}`, {
        baseURL: 'https://api.geekdo.com/xmlapi/',
      });
      const { boardgames }: BoardgameInitialResponse = JSON.parse(res.data);
      const { boardgame } = boardgames;
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
    } catch (e) {
      throw new Error('API not available');
    }
  }

  async getByRank(rank: number): Promise<BggRanks[]> {
    if (!rank) return [];
    try {
      return await this.bggRepository.find({
        where: {
          rank: rank,
        },
      });
    } catch (e) {
      throw new Error('API not available');
    }
  }
}
