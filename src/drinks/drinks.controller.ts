import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { customName } from 'src/utils/customname';
import { DrinkEntity } from './drink.entity';
import { DrinksService } from './drinks.service';

@Controller('drinks')
export class DrinksController {
    constructor(private service: DrinksService){
        
    }

    @Get()
    getAllDrinks(){
        return this.service.getAllDrinks();
    }

    @Get(':id')
    getDrink(@Param() params){
        return this.service.getDrink(params.id);
    }

    @Post()
    addDrink(@Body() food:DrinkEntity){
        return this.service.createDrink(food);
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

    async uploadFile(@Body() drink:DrinkEntity,@UploadedFile() file){
        drink.images = file.filename;
        await this.service.createDrink(JSON.parse(JSON.stringify(drink)));

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
    updateDrink(@Body() drink:DrinkEntity){
        this.service.updateDrink(drink);
    }

    @Delete(':id')
    deleteDrink(@Param() params){
        this.service.deleteDrink(params.id);
    }
}
