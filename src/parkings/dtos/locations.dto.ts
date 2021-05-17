import { IsNumber, IsNotEmpty } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateLocationDto {
    @IsNumber()
    @IsNotEmpty()
    readonly latitude: number;

    @IsNumber()
    @IsNotEmpty()
    readonly longitude: number;
}

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}