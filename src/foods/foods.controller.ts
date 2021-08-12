import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { customName } from 'src/utils/customname';
import { FoodEntity } from './food.entity';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {

    constructor(private service: FoodsService){
        
    }

    @Get()
    getAllFoods(){
        return this.service.getAllFoods();
    }

    @Get(':id')
    getFood(@Param() params){
        return this.service.getFood(params.id);
    }

    @Post()
    addFood(@Body() food:FoodEntity){
        return this.service.createFood(food);
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image',{
            storage: diskStorage({
                destination:'./images',
                filename: customName
            })
        })
    )

    async uploadFile(@Body() food:FoodEntity,@UploadedFile() file){
        food.images = file.filename;
        await this.service.createFood(JSON.parse(JSON.stringify(food)));

        const response = {
            originalName: file.originalname,
            finalName: file.filename
        }

        return{
            status: HttpStatus.OK,
            message:"Image has been uploaded",
            data:response
        }

    }

    @Put()
    updateFood(@Body() food:FoodEntity){
        this.service.updateFood(food);
    }

    @Delete(':id')
    deleteFood(@Param() params){
        this.service.deleteFood(params.id);
    }
}
