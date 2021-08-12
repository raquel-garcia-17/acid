import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from './food.entity';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

@Module({
  providers: [FoodsService],
  controllers: [
    FoodsController
  ],
  imports: [
    TypeOrmModule.forFeature(
      [
        FoodEntity
      ]
    )
  ]
})
export class FoodsModule {}
