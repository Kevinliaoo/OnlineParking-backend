import { Location } from './location.entity';
import { Address } from './address.entity';

export class Parking {
    _id: string;
    location: Location; 
    available: boolean;
    city: string; 
    address: Address; 
    last_updated: string; 
    counts: number;
    user: string;
}

export class UpdateParking {
    available: boolean;
    last_updated: string;
    user: string; 
    counts?: number;
}