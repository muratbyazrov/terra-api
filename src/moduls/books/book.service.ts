import { HttpException, Inject, Injectable } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { UserService } from '../users/service/user.service';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class BookService {
  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly request,
  ) {
  }

  async find() {
    try {
      return await BookEntity.find();

    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  async findOne(id) {
    try {
      return await BookEntity.findOne(id);
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  async create(book) {
    try {
      book.creator = await this.userService.findOne(this.request.session.user.id);
      book.created = new Date();
      return book.save();
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  async update(id, body) {
    try {
      return await BookEntity.update(id, body);
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  async updateBookPhoto(id, bookPhoto) {
    return await BookEntity.update(id, { photo: bookPhoto });
  }

  async delete(id) {
    try {
      const deletedBook = await this.findOne(id);
      deletedBook.deleted = true;
      delete deletedBook.id;
      return await this.update(id, deletedBook);
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }
}