import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import 'dotenv/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingModule } from './parkings/parking.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './environments';
import config from './config';


@Module({
  imports: [
    ParkingModule, 
    UsersModule, 
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      }),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
