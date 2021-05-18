import { IsNumber, IsString, IsNotEmpty, IsPositive } from 'class-validator';


export class CreateAddressDto {
    @IsString() 
    @IsNotEmpty()
    readonly streetName: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly number: number;
}