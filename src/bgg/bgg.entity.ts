import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class BggRanks {
  @PrimaryColumn()
  id: number;

  @Column({})
  name: string;

  @Column()
  yearpublished: number;

  @Column()
  rank: number;

  @Column()
  bayesaverage: number;

  @Column()
  usersrated: number;

  @Column()
  is_expansion: number;

  @Column({})
  abstracts_rank: number;

  @Column({})
  childrensgames_rank: number;

  @Column({})
  familygames_rank: number;

  @Column({})
  partygames_rank: number;

  @Column({})
  strategygames_rank: number;

  @Column({})
  thematic_rank: number;

  @Column({
    type: Number,
  })
  wargames_rank: number;
}
