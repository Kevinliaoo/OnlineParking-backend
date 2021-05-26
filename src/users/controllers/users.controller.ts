import { 
    Controller, 
    Get, Post, 
    Body,
    Param,
    Put,
} from '@nestjs/common'; 

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserPasswordDto, UpdateUserUsernameDto } from '../dtos/users.dto';

import { ParseUserPipe, ParseUsernamePipe, ParseNewUsernamePipe } from '../../common/parse-user.pipe';

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

    @Post('/') 
    createNew(@Body(ParseUserPipe) payload: CreateUserDto) {
        return this.usersService.createNewUser(payload);
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