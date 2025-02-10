import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('game_events')
export class GameEvents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: false })
  event_date: Date; // Дата события

  @Column({ type: 'jsonb', default: [] })
  participants: { name: string; id: string }[]; // Список участников

  @Column({ type: 'int', default: 0 })
  count: number; // Количество участников

  @Column({ type: 'text', nullable: true })
  location: string; // Место проведения (если нужно)

  @Column({ type: 'boolean', default: true })
  is_public: boolean; // Публичное или приватное событие

  @Column({ type: 'boolean', default: false })
  is_finished: boolean; // Завершено ли мероприятие

  @Column('int', { array: true, default: [] }) // 👈 Массив ID настолок
  boardGames: number[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
