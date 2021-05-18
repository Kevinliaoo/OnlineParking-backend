import { 
    Controller, 
    Get, Post, Put, 
    Query, Body, Param,
    ParseIntPipe,
} from '@nestjs/common'; 

import { ParkingsService } from '../services/parkings.service';
import { CreateParkingDto } from '../dtos/parkings.dto';

import { ParseBooleanPipe } from '../../common/parse-boolean.pipe';
import { CreateLocationDto } from '../dtos/locations.dto';

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
        // if (available) {
        //     return this.parkingsSerivce.getAvailablesByCity(city);
        // }
        return this.parkingsSerivce.getAllByCity(city);
    }

    @Post('/new')
    createNew(@Body() payload: CreateParkingDto) {
        const location: CreateLocationDto = payload.location;
        this.parkingsSerivce.createNew(payload); 
        return payload;
    }

    @Put('/:_id') 
    toggleParking(@Param('_id') _id: string) {
        return this.parkingsSerivce.toggleParking(_id);
    }


}