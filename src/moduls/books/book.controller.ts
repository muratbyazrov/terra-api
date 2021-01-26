import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../../guards/jwt.guard';
import { BookEntity } from './book.entity';
import { CreateBookDto } from './create.book.dto';
import { UpdateBookDto } from './update.book.dto';
import { UpdateResult } from 'typeorm';
import { BookService } from './book.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {
  }

  @Get()
  @UseGuards(JwtGuard)
  async find(): Promise<BookEntity[]> {
    return this.bookService.find();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Param('id') id: number): Promise<BookEntity> {
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

  @Delete('id')
  @UseGuards(JwtGuard)
  async delete(@Param('id') id: number): Promise<UpdateResult> {
    return this.bookService.delete(id);
  }
}