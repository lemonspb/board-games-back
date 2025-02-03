import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  date: string;

  @IsNumber()
  count: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  participants?: string[];
}
