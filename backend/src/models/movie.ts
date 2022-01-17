import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Genre } from './genre';
import { Person } from './person';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: '255' })
  public name: string;

  @Column({ type: 'int' })
  public year: number;

  @ManyToMany(() => Genre)
  @JoinTable()
  public genres: Genre[];

  @Column({ type: 'int' })
  public ageLimit: number;

  @Column({ type: 'int' })
  public rating: number;

  @Column({ type: 'text' })
  public synopsis: string;

  @ManyToMany(() => Person)
  @JoinTable()
  public actors: Person[];

  @ManyToOne(() => Person)
  public director: Person;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

export default Movie;
