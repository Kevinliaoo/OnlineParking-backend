import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

import { Location } from '../entities/location.entity';
import { Address } from '../entities/address.entity';


export class CreateParkingDto {
    @IsNotEmpty()
    readonly location: Location;

    @IsBoolean()
    @IsNotEmpty()
    readonly available: boolean;

    @IsString() 
    @IsNotEmpty()
    readonly city: string; 

    @IsNotEmpty()
    readonly address: Address;
}

export class UpdateParkingDto extends PartialType(CreateParkingDto) {}