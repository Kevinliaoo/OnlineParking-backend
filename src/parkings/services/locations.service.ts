import { Inject, Injectable } from '@nestjs/common'; 
import { Client } from 'pg';


@Injectable()
export class LocationService {
    private tableName: string = 'locations'

    constructor(@Inject('PG') private client: Client) {}

    createLocation(payload) {
        return new Promise((resolve, reject) => {
            this.client.query(`insert into ${this.tableName} (latitude, longitude) values ('${payload.latitude}', ${payload.longitude}) returning id`, (err, res) => {
                if (err) reject(err); 
                resolve(res)
            })
        })
    }

    getLocationss() {
        return new Promise((resolve, reject) => {
            this.client.query(`select * from ${this.tableName}`, (err, res) => {
                if (err) reject(err) 
                resolve(res.rows);
            })
        })
    }

    async getLocations() {
        console.log('Esty haciendo la peticion')
        const res = await this.client.query(`select * from ${this.tableName}`)
        console.log(res); 
        return res;
    }
}