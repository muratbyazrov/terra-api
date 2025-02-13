import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param, ParseIntPipe,
  Post,
  Put, Query, Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserLoginDto } from '../dto/user.login.dto';
import { UserService } from '../service/user.service';
import jwt = require('jsonwebtoken');
import { UpdateUserDto } from '../dto/update.user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  @UseGuards(JwtGuard)
  async find(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ): Promise<UserEntity[]> {
    const filter = {limit, offset}
    return this.userService.find(filter);
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
    return await this.userService.create(UserEntity.create(body));
  }

  @Post('login')
  async login(@Body() login: UserLoginDto, @Request() request) {
    const userLogin = await this.userService.login(login);
    request.session.user = userLogin.user;
    return userLogin;
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('avatar', {
    dest: 'uploads/avatars',
    preservePath: true,
  }))
  async update(@Param('id') id: string, @Body() body: UpdateUserDto, @UploadedFile() avatar): Promise<UpdateResult> {
    return this.userService.update(id, body, avatar);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.delete(id);
  }

}