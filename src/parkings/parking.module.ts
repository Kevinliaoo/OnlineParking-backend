import { Module } from '@nestjs/common';

import { ParkingsController } from './controllers/parkings.controller';

import { ParkingsService } from './services/parkings.service';

@Module({
    controllers: [ParkingsController], 
    providers: [ParkingsService],
})
export class ParkingModule {}
