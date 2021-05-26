import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common'; 
import { AuthGuard } from '@nestjs/passport';
import Request from 'express';

import { AuthService } from '../services/auth.service';
import { User } from '../entities/user.entity';
import { LoginDto } from '../dtos/auth.dto';

import { ParseAuthPipe } from '../../common/parse-user.pipe';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    // Login middleware
    @UseGuards(AuthGuard('local'))
    @Post('/loginn')
    llogin(@Req() req: Request) {
        return ("vdfjfmsdklo")
        // return this.authService.generateJwt(req.user as User);
    }

    @Post('/login')
    login(@Body(ParseAuthPipe) user: LoginDto) {
        return this.authService.generateJwt(user as User);
    }
}