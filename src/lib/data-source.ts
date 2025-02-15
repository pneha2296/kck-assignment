import { DataSource } from 'typeorm';
import { Post } from '../entities/Post';
import { Page } from '../entities/Page';

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
    if (!dataSource) {
        dataSource = new DataSource({
            type: 'postgres',
            host: "localhost",
            port: 5432,
            username: "localhost",
            password: "12345",
            database: "cms",
            entities: [Post, Page],
            synchronize: false,
            logging: process.env.NODE_ENV === 'development',
        });
        await dataSource.initialize();
    }
    return dataSource;
}
