import { Location } from './location.entity';
import { Address } from './address.entity';

export class Parking {
    _id: string;
    location: Location; 
    available: boolean;
    city: string; 
    address: Address; 
}