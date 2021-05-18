import { Inject, Injectable, NotFoundException } from '@nestjs/common'; 
import { Db } from 'mongodb';

import { Parking } from '../entities/parking.entity.ts';

@Injectable()
export class ParkingsService {

    constructor(@Inject('MONGO') private database: Db) {}

    private dummy: Parking[] = [
        {
            _id: "123a", 
            available: true, 
            city: 'Taoyuan', 
            address: {
                streetName: 'Taoyuan road', 
                number: 124
            },
            location: {
                latitude: 123,
                longitude: 124
            }
        }
    ]

    getAllByCity(city) {
        const collection = this.database.collection('parkings');
        return collection.find({}).toArray();
    }
    
    getAllByCityy(city) {

        const parkings = this.dummy.filter(p => p.city === city); 
        if (!parkings) {
            return []
        }
        return parkings;
    }

    getAvailablesByCity(city) {
        return this.getAllByCityy(city).filter(p => p.available);
    }

    findById(_id) {
        const parking = this.dummy.find(p => p._id === _id); 
        if (!parking) {
            throw new NotFoundException(`Location #${_id} does not exist`);
        }
        return parking;
    }

    searchByStreet(city, streetName, number) {
        return this.getAvailablesByCity(city).filter(p => {
            const { address } = p; 
            return address.streetName === streetName && address.number >= number
        })
    }

    createNew(payload) {
        this.database.collection('parkings');
    }

    toggleParking(_id) {
        const parkingSlot = this.dummy.find(p => p._id === _id); 
        if (!parkingSlot) {
            throw new NotFoundException(`Location #${_id} does not exist`);
        }
        parkingSlot.available = ! parkingSlot.available; 
        return parkingSlot;
    }
}