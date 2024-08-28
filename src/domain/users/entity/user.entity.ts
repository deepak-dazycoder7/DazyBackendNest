import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

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
  @Exclude() // This will exclude the password field from the response
  password: string;

  @Column()
  role: string

  @Column({ default: true })
  status: boolean;

  @Column()
  avtar: string;
}