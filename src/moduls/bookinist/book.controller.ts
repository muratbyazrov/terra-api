import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Post,
  Put, Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../../guards/jwt.guard';
import { BookEntity } from './book.entity';
import { CreateBookDto } from './create.book.dto';
import { UpdateBookDto } from './update.book.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BookService } from './book.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {
  }

  @Get()
  @UseGuards(JwtGuard)
  async find(
    @Query('activeBookList') activeBookList: string,
    @Query('price') price?: number,
    @Query('town') town?: number,
    @Query('genre') genre?: string
  ): Promise<BookEntity[]> {

    return this.bookService.find(activeBookList, {price, town, genre});
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BookEntity> {
    return this.bookService.findOne(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() body: CreateBookDto): Promise<BookEntity> {
    return this.bookService.create(BookEntity.create(body));
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: number, @Body() body: UpdateBookDto): Promise<UpdateResult> {
    return await this.bookService.update(id, body);
  }

  @Put('photo/:id')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('bookPhoto', {
    dest: 'uploads/books',
    preservePath: true,
  }))
  async updateBookPhoto(@Param('id') id: number, @UploadedFile() bookPhoto): Promise<UpdateResult> {
    return await this.bookService.updateBookPhoto(id, bookPhoto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.bookService.delete(id);
  }
}