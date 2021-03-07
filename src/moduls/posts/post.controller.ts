import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../guards/jwt.guard';
import { PostService } from './post.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PostEntity } from './post.entity';
import { PostUpdateDto } from './post.update.dto';
import { PostCreateDto } from './post.create.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Get()
  @UseGuards(JwtGuard)
  async find() {
    await this.postService.find();
  }

  @Get()
  @UseGuards(JwtGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    await this.postService.findOne(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() body: PostCreateDto): Promise<PostEntity> {
    return this.postService.create(PostEntity.create(body));
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: number, @Body() body: PostUpdateDto): Promise<UpdateResult> {
    return await this.postService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.postService.delete(id);
  }

}