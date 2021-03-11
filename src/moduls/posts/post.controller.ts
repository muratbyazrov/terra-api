import {
  Body,
  Controller,
  Delete,
  Get,
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
import { DeleteResult, UpdateResult } from 'typeorm';
import { PostEntity } from './post.entity';
import { PostUpdateDto } from './post.update.dto';
import { PostCreateDto } from './post.create.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Get()
  @UseGuards(JwtGuard)
  async find(
    @Query('postList') postList: string,
  ) {
    const filter = {
      postList,
    };
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
  async update(@Param('id') id: number, @Body() body: PostUpdateDto): Promise<UpdateResult> {
    return await this.postService.update(id, body);
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
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.postService.delete(id);
  }

}