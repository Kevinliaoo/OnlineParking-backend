import { 
    Controller, 
    Get, Post, 
    Body,
    Param,
    Put,
    UseGuards,
    Req,
} from '@nestjs/common'; 

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserPasswordDto, UpdateUserUsernameDto } from '../dtos/users.dto';

import { ParseUserPipe, ParseUsernamePipe, ParseNewUsernamePipe } from '../../common/parse-user.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PayloadToken } from '../entities/token.entity';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('/') 
    getAddresses() {
        return this.usersService.getAllUsers();
    }

    @Get('/username/:username') 
    findByUsername(@Param('username', ParseUsernamePipe) username: string) {
        return this.usersService.findUserByUsername(username);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/me') 
    getMe(@Req() req: Request) {
        const jwtData = req.user as PayloadToken; 
        const username: string = jwtData.username;

        return this.usersService.findUserByUsername(username);
    }

    @Post('/') 
    createNew(@Body(ParseUserPipe) payload: CreateUserDto) {
        return this.usersService.createNewUser(payload);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/parking/:parkingId') 
    toggleParking(@Param('parkingId') parkingId: string, @Req() req: Request) {
        const username = (req.user as PayloadToken).username;
        return this.usersService.toggleParking(username, parkingId);
    }

    @Put('/changePass/:username')
    changeUserPassword(@Body() { newPassword }: UpdateUserPasswordDto, @Param('username', ParseUsernamePipe) username: string) {
        return this.usersService.changePassword(newPassword, username);
    }

    @Put('/changeUsername/:username') 
    changeUsername(@Body(ParseNewUsernamePipe) { newUsername }: UpdateUserUsernameDto, @Param('username', ParseUsernamePipe) username: string) {
        return this.usersService.changeUsername(newUsername, username);
    }
}