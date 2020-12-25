import { HttpException, Injectable } from '@nestjs/common';
import { BookEntity } from './book.entity';

@Injectable()
export class BookService {

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