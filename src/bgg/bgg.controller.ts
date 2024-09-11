import { Controller, Get, Query } from '@nestjs/common';
import { BggService } from './bgg.service';
import {
  BggGetByIdResponse,
  BggSearchList,
  BggGetAllResponse,
} from './types/responces';

import { BggRanks } from './entity/rank.entity';

@Controller('bgg')
export class BggController {
  constructor(private readonly bggService: BggService) {}

  @Get('search')
  async search(@Query() params: { query: string }): Promise<BggSearchList> {
    return this.bggService.searchGame(params.query);
  }

  @Get('getAll')
  async getAll(): Promise<{ data: BggGetAllResponse[]; count: number }> {
    return await this.bggService.getAll();
  }

  @Get('getById')
  async getById(
    @Query() params: { id: number },
  ): Promise<Partial<BggGetByIdResponse>> {
    return this.bggService.getById(params.id);
  }

  @Get('getByRank')
  async getByRank(@Query() params: { id: number }): Promise<BggRanks[]> {
    return this.bggService.getByRank(params.id);
  }
}
