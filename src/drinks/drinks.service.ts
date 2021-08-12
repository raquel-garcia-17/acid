import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrinkEntity } from './drink.entity';

@Injectable()
export class DrinksService {
    constructor(@InjectRepository(DrinkEntity) private rep:Repository<DrinkEntity>){
    }

    async getAllDrinks(): Promise<DrinkEntity[]>{
        return await this.rep.find();
    }

    async getDrink(_id:number):Promise<DrinkEntity[]>{
        return await this.rep.findByIds(
            [
                _id
            ]
        )
    }

    async createDrink(drink:DrinkEntity){
        await this.rep.insert(drink);
    }

    async updateDrink(drink:DrinkEntity){
        await this.rep.update({id:drink.id},drink);
    }

    async deleteDrink(drink:DrinkEntity){
        await this.rep.delete(drink);
    }
}