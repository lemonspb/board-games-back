import { Controller, Get, Query } from '@nestjs/common';
import { BggSearchList } from '@/bgg/types/bgg';
import { BggService } from './bgg.service';

@Controller('bgg')
export class BggController {
  constructor(private readonly bggService: BggService) {}

  @Get('search')
  async search(@Query() params: { query: string }): Promise<BggSearchList> {
    return this.bggService.searchGame(params.query);
  }

  @Get('getByRank')
  async getByRank(@Query() params: { id: number }): Promise<any> {
    return this.bggService.getByRank(params.id);
  }

  @Get('getAll')
  async getAll(): Promise<any> {
    return this.bggService.getAll();
  }

  @Get('getById')
  async getById(@Query() params: { id: number }): Promise<any> {
    return this.bggService.getById(params.id);
  }
}
