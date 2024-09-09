import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { PropertyTypeEntity } from "../../property-type/entity/property-type.entity";
import { Exclude } from "class-transformer";

@Entity('division')
export class DivisionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  division_name: string;

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

  @DeleteDateColumn({
    type: 'timestamp',
    precision: 0,
    nullable: true,
    default: null,
  })
  @Exclude()
  deleted_at: Date;

  @Column({ nullable: true })
  created_by: number;

  @Column({ nullable: true })
  deleted_by: number;

  @OneToMany(() => PropertyTypeEntity, (propertyType) => propertyType.divisionId) 
  propertyTypes: PropertyTypeEntity[];
}
