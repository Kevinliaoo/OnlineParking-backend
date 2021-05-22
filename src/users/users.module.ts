import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { LocalStrategy } from './strategies/local.strategy';
import config from '../config';

@Module({
    controllers: [UsersController, AuthController], 
    providers: [UsersService, AuthService, LocalStrategy], 
    imports: [
        PassportModule, 
        JwtModule.registerAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                return {
                    secret: configService.jwtSecret, 
                    signOptions: {
                        expiresIn: '1d',
                    }
                }
            }
        })
    ]
})
export class UsersModule {}
