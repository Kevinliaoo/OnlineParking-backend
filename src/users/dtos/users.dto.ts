import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;
}

export class UpdateUserPasswordDto {
    @IsNotEmpty()
    @IsString() 
    readonly newPassword: string;
}

export class UpdateUserUsernameDto {
    @IsNotEmpty() 
    @IsString() 
    readonly newUsername: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}