import { 
    Controller, 
    Get, Post, 
    Body
} from '@nestjs/common'; 

import { AddressService } from '../services/addresses.service';
import { CreateAddressDto } from '../dtos/addresses.dto';


@Controller('addresses')
export class AddressesController {

    constructor(private addressService: AddressService) {}

    @Get('/') 
    getAddresses() {
        return this.addressService.getAddresses()
    }

    @Post('/') 
    async createNew(@Body() payload: CreateAddressDto) {
        const res: any = await this.addressService.createAddress(payload)
        return res.rows[0].id;
    }
}