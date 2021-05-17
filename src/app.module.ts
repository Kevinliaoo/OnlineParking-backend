import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingModule } from './parkings/parking.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ParkingModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
