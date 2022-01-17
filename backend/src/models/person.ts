import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: '255' })
  public firstName: string;

  @Column({ type: 'varchar', length: '255' })
  public lastName: string;
}

export default Person;
