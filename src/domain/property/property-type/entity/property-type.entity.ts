import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('property_types')
export class PropertyTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  type_name: string;

  @Column({ default: true })
  status: boolean;

  @Column('text')
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    nullable: true,
    default: null,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    nullable: true,
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    precision: 0,
    nullable: true,
    default: null,
  })
  deleted_at: Date;

  @Column({ nullable: true })
  created_by: number;

  @Column({ nullable: true })
  deleted_by: number;

  @Column()
  divisionId: number; //foreign key
}
