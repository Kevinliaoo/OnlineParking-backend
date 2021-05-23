import { Inject, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common'; 
import { Db, ObjectId } from 'mongodb';

import { Parking, UpdateParking } from '../entities/parking.entity.ts';

@Injectable()
export class ParkingsService {

    private collection: string = 'parkings';

    constructor(@Inject('MONGO') private database: Db) {}

    async getAllByCity(city: string) {
        try {
            const collection: Parking[] = await this.database.collection(this.collection).find({ city }).toArray();
            return collection
        } catch(e) {
            throw new InternalServerErrorException();
        }
    }

    async getAvailablesByCity(city: string) {
        const parkings: Parking[] = await this.getAllByCity(city);
        return parkings.filter((p) => p.available);
    }

    async findById(_id: ObjectId) {
        const parking: Parking = await this.database.collection(this.collection).findOne({ _id });
        if (!parking) {
            throw new NotFoundException(`Location #${_id} does not exist`);
        }
        return parking;
    }

    async searchByStreet(city: string, streetName: string, number: number) {
        const parkings = await this.getAvailablesByCity(city);
        return parkings.filter((p: Parking) => p.address.streetName === streetName && p.address.number >= number);
    }

    async createNew(payload: Parking) {
        payload.last_updated = this.getCurrentTime();
        payload.counts = 0;
        payload.user = "";
        payload.available = true;
        
        try {
            const res = await this.database.collection(this.collection).insertOne(payload);
            const id: string = res.insertedId;
            return id;
        } catch(e) {
            throw new InternalServerErrorException()
        }
    }

    async toggleParking(_id: ObjectId, user_id: string) {
        const parking = await this.findById(_id);
        try {
            // Fields to change
            const changes: UpdateParking = {
                available: !parking.available, 
                last_updated: this.getCurrentTime(), 
                user: user_id,
            }
            if (!parking.available) {
                changes.counts = parking.counts + 1;
                changes.user = "";
            }
            await this.database.collection(this.collection).updateOne(
                { _id }, 
                { $set: changes }
            );
            return {
                ...parking, 
                ...changes,
            }
        } catch(e) {
            throw new InternalServerErrorException();
        }
    }

    private getCurrentTime(): string {
        const now = new Date(); 
        return `${now.getFullYear()}/${now.getMonth()}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
    }
}