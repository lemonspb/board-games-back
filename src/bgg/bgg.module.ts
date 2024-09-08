import { Module } from '@nestjs/common';
import { BggController } from '@/bgg/bgg.controller';
import { BggService } from '@/bgg/bgg.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BggRanks } from './bgg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BggRanks])],
  controllers: [BggController],
  providers: [BggService],
})
export class BggModule {}
