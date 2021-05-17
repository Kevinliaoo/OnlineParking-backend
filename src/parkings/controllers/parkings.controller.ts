import { 
    Controller, 
    Get, Post, Put, Delete, 
    Query, Body, Param,
    ParseIntPipe
} from '@nestjs/common'; 

import { ParkingsService } from '../services/parkings.service';

import { ParseBooleanPipe } from '../../common/parse-boolean.pipe';

@Controller('parkings')
export class ParkingsController {
    private parkingsSerivce; 

    constructor(parkingsSerivce: ParkingsService) {
        this.parkingsSerivce = parkingsSerivce;
    }

    @Get('/street/:streetName')
    getByStreet(@Param('streetName') streetName: string, @Query('city') city: string, @Query('min', ParseIntPipe) min = 0) {
        return this.parkingsSerivce.searchByStreet(city, streetName, min);
    }

    @Get('/:_id') 
    getById(@Param('_id') _id: string) {
        return this.parkingsSerivce.findById(_id);
    }
 
    @Get('/')
    getAll(@Query('city') city: string, @Query('available', ParseBooleanPipe) available = false) {
        if (available) {
            return this.parkingsSerivce.getAvailablesByCity(city);
        }
        return this.parkingsSerivce.getAllByCity(city);
    }

}