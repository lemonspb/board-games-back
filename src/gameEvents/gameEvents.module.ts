import { Module } from '@nestjs/common';
import { GameEventsController } from './gameEvents.controller';
import { GameEventsService } from './gameEvents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEvents } from './entity/gameEvents.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameEvents])],
  controllers: [GameEventsController],
  providers: [GameEventsService],
})
export class GameEventsModule {}
