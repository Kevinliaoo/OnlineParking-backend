// nestjs
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

// Controllers
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
// Services
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
// Strategies
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
// Guards
import { JwtAuthGuard } from './guards/jwt-auth.guard';

// Others
import config from '../config';

@Module({
    controllers: [UsersController, AuthController], 
    providers: [UsersService, AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard], 
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
    ],
    exports: [JwtAuthGuard],
})
export class UsersModule {}
