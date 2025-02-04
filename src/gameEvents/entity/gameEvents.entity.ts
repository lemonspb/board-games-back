import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('game_events')
export class GameEvents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text' })
  date: string;

  @Column({ type: 'jsonb', default: '[]' })
  participants: { id: string; name: string }[];

  @Column({ type: 'int', default: 0 })
  count: number;
}
