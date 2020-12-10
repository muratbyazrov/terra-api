import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserLoginDto } from '../dto/user.login.dto';
import { UserService } from '../service/user.service';
import jwt = require('jsonwebtoken');

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  @UseGuards(JwtGuard)
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async findCurrentUser(@Headers() headers) {
    const userData: any = await jwt.decode(headers.authorization);
    return this.userService.findOne(userData.id);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<UserEntity> {
    console.log(body);
    return await this.userService.create(UserEntity.create(body));
  }

  @Post('login')
  async login(@Body() login: UserLoginDto) {
    return this.userService.login(login);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: string, @Body() body: CreateUserDto): Promise<UpdateResult> {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.delete(id);
  }

}