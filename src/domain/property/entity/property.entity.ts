import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PropertyTypeEntity } from '../property-type/entity/property-type.entity';
import { Exclude } from 'class-transformer';

@Entity('property')
export class PropertyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column({ length: 255 })
  location: string;

  @ManyToOne(() => PropertyTypeEntity, { eager: true })
  propertyType: PropertyTypeEntity;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ type: 'simple-array', nullable: true })
  amenities: string[];

  @Column({ type: 'date', nullable: true })
  availableFrom: Date;

  @Column({ type: 'date', nullable: true })
  availableTo: Date;

  // Address fields
  @Column({ length: 255 })
  street: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  state: string;

  @Column({ length: 20 })
  zipCode: string;

  @Column({ length: 100 })
  country: string;

  // New fields for file paths
  @Column('simple-array', { nullable: true })
  images: string[];

  @Column('simple-array', { nullable: true })
  videos: string[];

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
}
