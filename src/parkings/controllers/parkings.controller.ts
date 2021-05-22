import { 
    Controller, 
    Get, Post, Put, 
    Query, Body, Param,
    ParseIntPipe,
    UseGuards, Req
} from '@nestjs/common'; 
import { ObjectId } from 'mongodb';
import { Request } from 'express';

import { ParkingsService } from '../services/parkings.service';

import { CreateParkingDto } from '../dtos/parkings.dto';

import { ParseBooleanPipe } from '../../common/parse-boolean.pipe';

import { JwtAuthGuard } from '../../users/guards/jwt-auth.guard';
import { PayloadToken } from '../../users/entities/token.entity';

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
        try {
            const objectId = new ObjectId(_id); 
            return this.parkingsSerivce.findById(objectId);
        } catch(e) {
            throw 'Invalid ID format';
        }
    }
 
    @Get('/')
    getAll(@Query('city') city: string, @Query('available', ParseBooleanPipe) available = false) {
        if (available) {
            return this.parkingsSerivce.getAvailablesByCity(city);
        }
        return this.parkingsSerivce.getAllByCity(city);
    }

    // Use jwt strategy 
    @UseGuards(JwtAuthGuard)
    @Post('/new')
    createNew(@Body() payload: CreateParkingDto, @Req() req: Request) {
        /**
         * En esta línea estoy obteniendo el payload en el JWT
         */
        const jwtData = req.user as PayloadToken;
        console.log(jwtData.username); 
        console.log(jwtData.sub);
        return this.parkingsSerivce.createNew(payload); 
    }

    @Put('/:_id') 
    toggleParking(@Param('_id') _id: string) {
        try {
            const objectId = new ObjectId(_id);
            return this.parkingsSerivce.toggleParking(objectId);
        } catch(e) {
            throw 'Invalid ID format'
        }
    }
}