import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common'; 
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    // Login middleware
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    login(@Req() req: Request) {
        return this.authService.generateJwt(req.user as User);
    }
}