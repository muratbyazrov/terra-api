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

  async find(activeBookList) {

    const currentUserId = this.request.session.user.id

    try {

      if (activeBookList === 'buy-list') {
        const books = await BookEntity.find({
          relations: ['creator']
        });

        return books.filter(book => book.creator.id !== currentUserId);
      }

      if (activeBookList === 'favorite-list') {
        const books = await BookEntity.find({
          relations: ['favoriteCreator']
        })
        return books.filter(book => book.favoriteCreator.map(bookFavoriteCreator => bookFavoriteCreator.id).includes(currentUserId));
      }

      if (activeBookList === 'sell-list') return await BookEntity.find({ where: { creator: { id: currentUserId } } });

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

      return await BookEntity.query(`INSERT INTO security.user_favorite_book (favorite_book_id, user_id) VALUES (${id}, ${body.favoriteCreator.id})`)

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