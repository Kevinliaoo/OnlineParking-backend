import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Location } from '../entities/location.entity';
import { Address } from '../entities/address.entity';
import { CreateLocationDto } from './locations.dto';
import { CreateAddressDto } from './addresses.dto';

export class CreateParkingDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateLocationDto)
    readonly location: Location

    @IsString() 
    @IsNotEmpty()
    readonly city: string; 

    @IsNotEmpty()
    @ValidateNested() 
    @Type(() => CreateAddressDto)
    readonly address: Address;
}
