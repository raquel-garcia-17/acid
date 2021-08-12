import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FoodsModule } from './foods/foods.module';
import { DrinksController } from './drinks/drinks.controller';
import { DrinksModule } from './drinks/drinks.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','avatars')
    }),
    FoodsModule,
    DrinksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
