import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
    @IsNumber()
    @IsNotEmpty()
    readonly lat: number;

    @IsNumber()
    @IsNotEmpty()
    readonly lng: number;
}