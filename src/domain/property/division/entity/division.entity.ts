import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { Exclude } from "class-transformer";

@Entity('division')
export class DivisionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

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

    // Timestamp for when the entity was deleted
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    // The user who deleted the entity
    // @ManyToOne(() => UserEntity, (user) => user.deletedEntities, { nullable: true })
    //  deletedBy: UserEntity;


}