import { Inject, Injectable } from '@nestjs/common'; 
import { Client } from 'pg';


@Injectable()
export class AddressService {
    private tableName: string = 'addresses'

    constructor(@Inject('PG') private client: Client) {}

    createAddress(payload) {
        return new Promise((resolve, reject) => {
            this.client.query(`insert into ${this.tableName} (streetName, number) values ('${payload.streetName}', ${payload.number}) returning id`, (err, res) => {
                if (err) reject(err); 
                resolve(res)
            })
        })
    }

    getAddresses() {
        return new Promise((resolve, reject) => {
            this.client.query(`select * from ${this.tableName}`, (err, res) => {
                if (err) reject(err) 
                resolve(res.rows);
            })
        })
    }
}