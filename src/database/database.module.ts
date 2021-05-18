import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Global() 
@Module({
    providers: [
        {
            provide: 'MONGO',
            useFactory: async () => {
                const url = process.env.MONGO_URL; 
                const client = new MongoClient(url, {useUnifiedTopology: true});
                await client.connect();
                const database = client.db('parkings');
                return database; 
            }
        }
    ], 
    exports: ['MONGO']
})
export class DatabaseModule {}