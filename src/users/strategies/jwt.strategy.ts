import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import config from '../../config';
import { PayloadToken } from '../entities/token.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        @Inject(config.KEY) configService: ConfigType<typeof config>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, 
            secretOrKey: configService.jwtSecret,
        })
    }

    validate(payload: PayloadToken) {
        return payload;
    }
}