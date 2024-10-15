import { Exclude } from 'class-transformer';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('files')
export class FilesEntity {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 130, nullable: true, default: null })
    file_name: string | null;

    @Column({ type: 'varchar', length: 150, nullable: true, default: null })
    url: string; // This will store the file path

    @Column({ type: 'varchar', length: 150, nullable: true, default: null })
    description: string;

    @Column({ type: 'varchar', length: 30, nullable: true, default: null })
    type: string; // 'image', 'video', 'document'

    @Column({ type: 'varchar', length: 30, nullable: true, default: null })
    format: string; // e.g., 'jpg', 'png', 'mp4', 'pdf'

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Exclude()
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true, default: null, onUpdate: 'CURRENT_TIMESTAMP' })
    @Exclude()
    update_at: Date | null;

    @Column({ type: 'int', nullable: true, default: null })
    created_by: number | null;
}
