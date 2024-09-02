import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('property_types')
export class PropertyTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  status: boolean;

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
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at: Date;
}
