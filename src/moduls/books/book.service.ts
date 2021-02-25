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

    const currentUserId = this.request.session.user.id;

    try {

      if (activeBookList === 'buy-list') {
        const books = await BookEntity.find({
          relations: ['creator', 'favoriteCreators'],
        });

        return books.filter(book => book.creator.id !== currentUserId);
      }

      if (activeBookList === 'favorite-list') {
        const books = await BookEntity.find({
          relations: ['creator', 'favoriteCreators'],
        });
        return books.filter(book => book.favoriteCreators.map(bookFavoriteCreator => bookFavoriteCreator.id).includes(currentUserId));
      }

      if (activeBookList === 'sell-list') {
        return await BookEntity.find({
          where: { creator: { id: currentUserId } },
          relations: ['favoriteCreators'],
        });
      }

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
      const oldBook: BookEntity = await BookEntity.findOne(id, {
        relations: ['creator', 'favoriteCreators'],
      });

      if (body.favoriteCreator && !oldBook.favoriteCreators.map(favoriteCreator => favoriteCreator.id).includes(this.request.session.user.id)) {
        return await BookEntity.query(`INSERT INTO security.user_favorite_book (favorite_book_id, user_id) VALUES (${id}, ${body.favoriteCreator.id})`);
      }

      if (body.favoriteCreator && oldBook.favoriteCreators.map(favoriteCreator => favoriteCreator.id).includes(this.request.session.user.id)) {
        return await BookEntity.query(`DELETE FROM security.user_favorite_book WHERE user_id = ${this.request.session.user.id} AND favorite_book_id = ${id}`);
      }

      return await BookEntity.update(id, body);
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  async updateBookPhoto(id, bookPhoto) {
    try {
      return await BookEntity.update(id, { photo: bookPhoto });
    } catch (err) {
      throw new HttpException(err.message, 400);
    }

  }

  async delete(id) {
    //написать проверку, чтобы не удалять чужие книши
    // прописать удаление фото из базы
    try {
      return await BookEntity.delete(id);
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }
}