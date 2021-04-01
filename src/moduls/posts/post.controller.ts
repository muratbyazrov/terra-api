import {
  Body,
  Controller,
  Delete, ForbiddenException,
  Get, Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query, UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../../guards/jwt.guard';
import { PostService } from './post.service';
import { UpdateResult } from 'typeorm';
import { PostEntity } from './post.entity';
import { PostUpdateDto } from './post.update.dto';
import { PostCreateDto } from './post.create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { REQUEST } from '@nestjs/core';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @Inject(REQUEST) private readonly request,
  ) {
  }


  @Get()
  @UseGuards(JwtGuard)
  async find(
    @Query('postList') postList: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    const filter = { postList, limit, offset };

    return await this.postService.find(filter);
  }

  @Get()
  @UseGuards(JwtGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.findOne(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() body: PostCreateDto): Promise<PostEntity> {
    return this.postService.create(PostEntity.create(body));
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: number, @Body() body: PostUpdateDto) {
    await this.postService.update(id, body);
  }

  @Put('photo/save')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('postPhoto', {
    dest: 'uploads/posts',
    preservePath: true,
  }))
  async savePhoto(@UploadedFile() postPhoto): Promise<UpdateResult> {
    return await postPhoto;
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const deletedPost = await this.findOne(id);

    if (deletedPost.creator.id !== this.request.session.user.id) {
      throw new ForbiddenException('Недостаточно прав');
    }

    await this.postService.delete(id);
  }

}