import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./create.user.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller('user')
export class UserControoler {
    
    constructor(private userService: UserService){}

    @Get()
    async findAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string ) {
        return this.userService.findOne(id)
    }

    @Post()
    async create(@Body() body: CreateUserDto): Promise<UserEntity> {
        return await this.userService.create(UserEntity.create(body))
    }

    @Put(':id')
    async update(@Param('id') id: string) {
        return this.userService.update(id)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.delete(id)
    }

}