import { 
    Controller, 
    Get, Post, 
    Body,
    Param
} from '@nestjs/common'; 

import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/users.dto';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('/') 
    getAddresses() {
        return this.usersService.getAllUsers();
    }

    @Get('/username/:username') 
    findByUsername(@Param('username') username: string) {
        return this.usersService.findUserByUsername(username);
    }

    @Post('/') 
    async createNew(@Body() payload: CreateUserDto) {
        return this.usersService.createNewUser(payload);
    }
}