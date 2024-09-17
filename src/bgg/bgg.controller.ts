import { Controller, Get, Query } from '@nestjs/common';
import { BggService } from './bgg.service';
import {
  BggGetByIdResponse,
  BggSearchList,
  BggGetAllResponse,
} from './types/responces';
import { BggRanks } from './entity/rank.entity';
import { SearchQueryDto } from './dto/bgg.dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('bgg')
export class BggController {
  constructor(private readonly bggService: BggService) {}

  @Get('search')
  async search(@Query() query: SearchQueryDto): Promise<BggSearchList> {
    return this.bggService.searchGame(query.query);
  }

  @Get('getAll')
  async getAll(): Promise<{ data: BggGetAllResponse[]; count: number }> {
    return await this.bggService.getAll();
  }

  @Get('getById')
  async getById(
    @Query('id', ParseIntPipe) id: number,
  ): Promise<Partial<BggGetByIdResponse>> {
    return this.bggService.getById(id);
  }

  @Get('getByRank')
  async getByRank(
    @Query('rank', ParseIntPipe) rank: number,
  ): Promise<BggRanks[]> {
    return this.bggService.getByRank(rank);
  }
}
