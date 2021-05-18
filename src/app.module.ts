import { Module } from '@nestjs/common';
import 'dotenv/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingModule } from './parkings/parking.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ParkingModule, UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
