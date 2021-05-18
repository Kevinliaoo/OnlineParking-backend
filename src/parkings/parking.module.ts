import { Module } from '@nestjs/common';

import { ParkingsController } from './controllers/parkings.controller';
import { AddressesController } from './controllers/addresses.controller';
import { LocationsController } from './controllers/locations.controller';

import { ParkingsService } from './services/parkings.service';
import { AddressService } from './services/addresses.service';
import { LocationService } from './services/locations.service';

@Module({
    controllers: [ParkingsController, AddressesController, LocationsController], 
    providers: [ParkingsService, AddressService, LocationService],
})
export class ParkingModule {}
