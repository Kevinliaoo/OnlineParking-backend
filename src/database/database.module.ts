import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { MongoClient } from 'mongodb';

const client = new Client({
    user: process.env.DATABASE_USER, 
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME, 
    password: process.env.DATABASE_PSW,
    port: parseInt(process.env.DATABASE_PORT),
  })
  
  client.connect(); 

@Global() 
@Module({
    providers: [
        {
            provide: 'PG',
            useValue: client
        },
        {
            provide: 'MONGO',
            useFactory: async () => {
                console.log('Entrando a mongo')
                const url = process.env.MONGO_URL; 
                console.log('Crendo el cleinte')
                const client = new MongoClient(url, {useUnifiedTopology: true});
                console.log('Cree el cliente')
                await client.connect();
                console.log('Conecte')
                const database = client.db('parkings');
                console.log('La base de datos')
                console.log(database);
                return database; 
            }
        }
    ], 
    exports: ['MONGO', 'PG']
})
export class DatabaseModule {}