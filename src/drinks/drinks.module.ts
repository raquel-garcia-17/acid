import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrinkEntity } from './drink.entity';
import { DrinksController } from './drinks.controller';
import { DrinksService } from './drinks.service';

@Module({
  providers: [DrinksService],
  controllers: [
    DrinksController
  ],
  imports: [
    TypeOrmModule.forFeature(
      [
        DrinkEntity
      ]
    )
  ]
})
export class DrinksModule {}
