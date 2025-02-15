import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    slug?: string;

    @Column('text')
    content?: string;

    @Column()
    title?: string;
}