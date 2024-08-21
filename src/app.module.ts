import { Module } from '@nestjs/common';
import { BggController } from '@/bgg/bgg.controller';
import { BggService } from '@/bgg/bgg.service';

@Module({
  imports: [],
  controllers: [BggController],
  providers: [BggService],
})
export class AppModule {}
