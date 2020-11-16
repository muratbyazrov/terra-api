import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";
import { CreateUserDto } from "./create.user.dto";
import { UserEntity } from "./user.entity";
import { UserLoginDto } from "./user.login.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserControoler {
    constructor(private userService: UserService) {}

    @Get()
    async findAll(): Promise<UserEntity[]> {
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string ): Promise<UserEntity> {
        return this.userService.findOne(id)
    }

    @Post()
    async create(@Body() body: CreateUserDto): Promise<UserEntity> {
        return await this.userService.create(UserEntity.create(body))
    }

    @Post('login')
    async login(@Body() login: UserLoginDto ) {
        return this.userService.login(login);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: CreateUserDto): Promise<UpdateResult>  {
        return this.userService.update(id, body)
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<DeleteResult> {
        return this.userService.delete(id)
    }

}