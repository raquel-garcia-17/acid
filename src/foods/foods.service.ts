import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntity } from './food.entity';

@Injectable()
export class FoodsService {
    constructor(@InjectRepository(FoodEntity) private rep:Repository<FoodEntity>){
    }

    async getAllFoods(): Promise<FoodEntity[]>{
        return await this.rep.find();
    }

    async getFood(_id:number):Promise<FoodEntity[]>{
        return await this.rep.findByIds(
            [
                _id
            ]
        )
    }

    async createFood(food:FoodEntity){
        await this.rep.insert(food);
    }

    async updateFood(food:FoodEntity){
        await this.rep.update({id:food.id},food);
    }

    async deleteFood(food:FoodEntity){
        await this.rep.delete(food);
    }
}
