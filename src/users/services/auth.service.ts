import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'; 
import { Db } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../entities/user.entity';
import { PayloadToken } from '../entities/token.entity';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {

    private collection: string = 'users';

    constructor(@Inject('MONGO') private database: Db, private userService: UsersService, private jwtService: JwtService) {}

    async login(username: string, password: string) {
        const user: User = await this.userService.findUserByUsername(username, true);
        
        if (user) {
            const passwordMatch = bcrypt.compareSync(password, user.password);
            delete user.password;
            if (passwordMatch) {
                return user;
            }
        }
        return null;
    }

    async generateJwt(user: User) {
        const payload: PayloadToken = {
            username: user.username,
            sub: user._id,
        }
        return {
            accessToken: this.jwtService.sign(payload),
            user
        }
    }
}