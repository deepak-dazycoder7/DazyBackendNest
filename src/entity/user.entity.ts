import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique : true})
  email: string;

  @Column()
  password: string;

  @Column()
  role: string

  @Column({ default: true })
  status: boolean;

  @Column()
  avtar: string;
}