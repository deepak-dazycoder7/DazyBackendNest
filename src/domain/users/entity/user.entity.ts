import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0, 
    nullable: true, 
    default: null,
  })
  @Exclude()
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0, 
    nullable: true,
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  @Exclude()
  updated_at: Date;

  @Column()
  avtar: string;
}