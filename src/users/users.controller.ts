import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { diskStorage } from 'multer';
import { customName } from 'src/utils/customname';

@Controller('users')
export class UsersController {
    constructor(private service:  UsersService){
    }
    
    @Get()
    getAllUsers(){
        return this.service.getAllUsers();
    }

    @Get(':id')
    getUser(@Param() params){
        return this.service.getUser(params.id);
    }

    @Post()
    addUser(@Body() user: UserEntity){
        return this.service.createUser(user);
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image',{
            storage:diskStorage({
                destination:'./avatars',
                filename: customName
            })
        })
    )
    async uploadFile(@Body() user:UserEntity,@UploadedFile() file){
        user.avatar = file.filename;
        await this.service.createUser(JSON.parse(JSON.stringify(user)));

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
    updateUser(@Body() user:UserEntity){
        this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params){
        this.service.deleteUser(params.id);
    }
}


