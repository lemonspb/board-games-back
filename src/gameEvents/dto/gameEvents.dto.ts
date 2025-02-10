import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Board Game Night' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Играем в настолки' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-02-05T18:30:00.000Z' })
  @IsDateString()
  eventDate: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  count: number;

  @ApiPropertyOptional({
    example: [
      { name: 'Иван', id: 'abc123' },
      { name: 'Мария', id: 'abc345' },
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  participants?: { name: string; id?: string }[];

  @ApiPropertyOptional({ example: [1, 3, 7] }) // 👈 ID настолок
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  boardGames?: number[];
}
