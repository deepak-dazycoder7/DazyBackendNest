import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PropertyEntity } from '../../entity/property.entity';  

@Entity('property_types')
export class PropertyTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  status: boolean;

  @Column('text')
  description: string;

  // One-to-Many relation with PropertyEntity
  @OneToMany(() => PropertyEntity, (property) => property.propertyType)
  properties: PropertyEntity[];

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
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  updated_at: Date;
}
