import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GameEvents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  date: string;

  @Column()
  count: number;

  @Column('jsonb', { default: [] }) // JSONB-массив для имён участников
  participants: string[];
}
