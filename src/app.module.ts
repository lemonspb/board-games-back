import { Module } from '@nestjs/common';
// import { BggController } from '@/bgg/bgg.controller';
// import { BggService } from '@/bgg/bgg.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BggModule } from '@/bgg/bgg.module';
import { BggRanks } from './bgg/bgg.entity';
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
      entities: [BggRanks],
      synchronize: false,
    }),
    BggModule,
  ],
})
export class AppModule {}
