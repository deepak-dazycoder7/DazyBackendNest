import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,  } from "typeorm";
import { Exclude } from "class-transformer";

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  category_name: string;

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

  @Column()
  divisionId: number; //foreign key
}
