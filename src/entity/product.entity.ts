import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class ProductEntity {
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

  @Column({ type: 'enum', enum: ['room', 'house'], default: 'room' })
  propertyType: 'room' | 'house';

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
}
