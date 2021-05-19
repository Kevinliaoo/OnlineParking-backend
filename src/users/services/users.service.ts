import { Inject, Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common'; 
import { Db } from 'mongodb';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

    private collection: string = 'users';

    constructor(@Inject('MONGO') private database: Db) {}

    async createNewUser(payload: User) {
        
        const username = payload.username;
        try {
            const user = await this.database.collection(this.collection).findOne({ username }); 
            if (user !== null) {
                throw new BadRequestException('User already exists')
            }
        } catch (e) {
            throw new InternalServerErrorException()
        }

        payload.password = bcrypt.hashSync(payload.password, 5);
        try {
            await this.database.collection(this.collection).insertOne(payload);
            return this.removePassword(payload); 
        } catch(e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    async getAllUsers() {
        try {
            let users: User[] = await this.database.collection(this.collection).find({}).toArray()
            return this.removePasswordMany(users);
        } catch(e) {
            throw new InternalServerErrorException()
        }
    }

    async findUserByUsername(username: string) {
        try {
            const user: User = await this.database.collection(this.collection).findOne({ username });
            return this.removePassword(user);
        } catch (e) {
            throw new NotFoundException('User not found')
        }
    }

    private removePassword(user: User): User {
        delete user.password;
        return user;
    }

    private removePasswordMany(users: User[]): User[] {
        return users.map(user => {
            const { password, ...data } = user; 
            return data;
        })
    }
}