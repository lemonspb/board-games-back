import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BggModule } from '@/bgg/bgg.module';
import { BggRanks } from '@/bgg/entity/rank.entity';
import { GameEvents } from '@/gameEvents/entity/gameEvents.entity';
import { GameEventsModule } from '@/gameEvents/gameEvents.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [BggRanks, GameEvents],
      synchronize: false,
    }),
    BggModule,
    GameEventsModule,
  ],
})
export class AppModule {}
