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
        payload.occupied = '';
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

    async findUserByUsername(username: string, returnPsw?: boolean) {
        try {
            const user: User = await this.database.collection(this.collection).findOne({ username });
            if (returnPsw) {
                return user;
            }
            return this.removePassword(user);
        } catch (e) {
            throw new NotFoundException('User not found')
        }
    }

    async changePassword(newPassword: string, username: string) {
        const foundUser = await this.findUserByUsername(username); 
        if(!foundUser) {
            throw new InternalServerErrorException(); 
        }
        const password = bcrypt.hashSync(newPassword, 5);
        try {
            const res = await this.database.collection(this.collection).updateOne({ username }, { $set: { password } })
            return res.result.ok;
        } catch(e) {
            throw new InternalServerErrorException('Unable to change password');
        }
    }

    async changeUsername(newUsername: string, username: string) {
        const foundUser = await this.findUserByUsername(username); 
        if(!foundUser) {
            throw new InternalServerErrorException(); 
        }

        try {
            const existUser = await this.findUserByUsername(newUsername);
            return new InternalServerErrorException('The username is already registered');
        } catch(e) {}
        
        try {
            const res = await this.database.collection(this.collection).updateOne(
                { username },
                { $set: { username: newUsername } }
            );
            return res.result.ok;
        } catch(e) {
            throw new InternalServerErrorException('Unable to update username');
        }
    }

    async toggleParking (username: string, parkingId: string) {
        let toConvert = ''; 

        const user: User = await this.findUserByUsername(username);
        if (user.occupied === '') {
            toConvert = parkingId;
        } 
        else if (user.occupied !== '') {
            if (user.occupied === parkingId) {
                toConvert = '';
            }
            else {
                throw new InternalServerErrorException();
            }
        }
        try {
            await this.database.collection(this.collection).updateOne(
                { username },
                { $set: { occupied: toConvert } }
            )
            return parkingId;
        } catch(e) {
            throw new InternalServerErrorException();
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