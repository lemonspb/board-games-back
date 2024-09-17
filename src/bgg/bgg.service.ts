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
        data: json.items.item.map(({ _attributes, yearpublished, name }) => ({
          name: name._attributes.value,
          id: _attributes.id,
          yearpublished: yearpublished._attributes?.value || 'Unknown',
        })),
      };
    } catch (e) {
      console.error('Error during searchGame:', e.message);
      throw new Error('API not available');
    }
  }

  async getAll(): Promise<{ data: BggGetAllResponse[]; count: number }> {
    try {
      const [data, total] = await this.bggRepository.findAndCount({
        take: 10,
        skip: 0,
      });

      const fullData = await Promise.all(
        data.map(async (res) => {
          try {
            const {
              age,
              description,
              image,
              thumbnail,
              maxplayers,
              minplayers,
              playingtime,
            } = await this.getById(res.id);
            return {
              age: age || 'N/A',
              image: image || 'No image available',
              playingtime: playingtime,
              thumbnail: thumbnail || 'No thumbnail available',
              description: description || 'No description available',
              maxplayers: maxplayers || 'N/A',
              minplayers: minplayers || 'N/A',
              ...res,
            };
          } catch (error) {
            console.error(`Failed to fetch game by ID: ${res.id}`, error);
            return null; // Возвращаем null, если запрос не удался
          }
        }),
      );

      return {
        data: fullData.filter(Boolean), // Убираем null значения из массива
        count: total,
      };
    } catch (e) {
      console.error('Error during getAll:', e.message);
      throw new Error('API not available');
    }
  }

  async getById(id: number): Promise<Partial<BggGetByIdResponse>> {
    if (!id) return {};

    try {
      const res = await axiosBgg.get(`/boardgame/${id}?stats=1`, {
        baseURL: 'https://api.geekdo.com/xmlapi/',
      });
      const { boardgames }: BoardgameInitialResponse = JSON.parse(res.data);
      const { boardgame } = boardgames;

      const translatedDescription = boardgame.description?._text
        ? await translatteText(
            removeAllTagsFromString(boardgame.description._text),
          )
        : 'No description available';

      return {
        id: id,
        age: boardgame.age?._text || 'N/A',
        description: translatedDescription,
        playingtime: boardgame.playingtime?._text || 'N/A',
        minplayers: boardgame.minplayers?._text || 'N/A',
        maxplayers: boardgame.maxplayers?._text || 'N/A',
        image: boardgame.image?._text || 'No image available',
        thumbnail: boardgame.thumbnail?._text || 'No thumbnail available',
      };
    } catch (e) {
      console.error(`Error fetching game with ID: ${id}`, e.message);
      throw new Error('API not available');
    }
  }

  async getByRank(rank: number): Promise<BggRanks[]> {
    if (isNaN(rank)) {
      throw new Error('Invalid rank');
    }

    try {
      return await this.bggRepository.find({
        where: {
          rank: rank,
        },
      });
    } catch (e) {
      console.error(`Error fetching games by rank: ${rank}`, e.message);
      throw new Error('API not available');
    }
  }
}
