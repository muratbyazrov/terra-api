import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  controllers:[BookController],
  providers: [BookService],
  exports: [],
})
export class BookModule{}