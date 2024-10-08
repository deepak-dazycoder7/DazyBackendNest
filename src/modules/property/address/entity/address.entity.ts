import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('address')
  export class AddressEntity {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;
  
    @Column({ type: 'int' })
    country_id: number;
  
    @Column({ type: 'int' })
    state_id: number;
  
    @Column({ type: 'int' })
    city_id: number;
  
    @Column({ length: 150 })  
    address: string;
  
    @Column({ type: 'varchar', length: 130, nullable: true, default: null })
    landmark: string | null;
  
    @Column({ length: 10 })
    zipCode: number;
  
    @Column({ type: 'varchar', length: 50 })
    latitude: string;
  
    @Column({ type: 'varchar', length: 50 })
    longitude: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: true, default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    update_at: Date | null;
  
    @Column({ type: 'int', nullable: true, default: null })
    created_by: number | null;
  
    @Column({ type: 'int', nullable: true, default: null })
    updated_by: number | null;
  }
  