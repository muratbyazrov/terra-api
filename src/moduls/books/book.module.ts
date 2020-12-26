import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { UserService } from '../users/service/user.service';

@Module({
  controllers:[BookController],
  providers: [BookService, UserService],
  exports: [],
})
export class BookModule{}