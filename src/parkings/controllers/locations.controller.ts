import { 
    Controller, 
    Get, Post, 
    Body,
} from '@nestjs/common'; 

import { LocationService } from '../services/locations.service';
import { CreateLocationDto } from '../dtos/locations.dto';


@Controller('locations')
export class LocationsController {

    constructor(private locationService: LocationService) {}

    @Get('/') 
    getAddresses() {
        return this.locationService.getLocations()
    }

    @Post('/') 
    async createNew(@Body() payload: CreateLocationDto) {
        const res: any = await this.locationService.createLocation(payload); 
        return res.rows[0].id;
    }
}