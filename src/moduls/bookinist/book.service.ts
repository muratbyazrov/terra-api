import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { UserService } from '../users/service/user.service';
import { REQUEST } from '@nestjs/core';
import { BookListNameEnum } from './book.list.name.enum';

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
      if (activeBookList === BookListNameEnum.BOOKINIST_LIST_BUY) {
        const books = await BookEntity.find({
          relations: ['creator', 'favoriteCreators'],
        });

        return books.filter(book => book.creator.id !== currentUserId);
      }

      if (activeBookList === BookListNameEnum.BOOKINIST_LIST_FAVORITE) {
        const books = await BookEntity.find({
          relations: ['creator', 'favoriteCreators'],
        });
        return books.filter(book => book.favoriteCreators.map(bookFavoriteCreator => bookFavoriteCreator.id).includes(currentUserId));
      }

      if (activeBookList === BookListNameEnum.BOOKINIST_LIST_SELL) {
        return await BookEntity.find({
          where: { creator: { id: currentUserId } },
          relations: ['creator', 'favoriteCreators'],
        });
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id) {
    try {
      return await BookEntity.findOne(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(book) {
    try {
      book.creator = await this.userService.findOne(this.request.session.user.id);
      book.created = new Date();
      return book.save();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id, body) {
    let oldBook: BookEntity;
    try {
      oldBook = await BookEntity.findOne(id, {
        relations: ['creator', 'favoriteCreators'],
      });

      if (body.favoriteCreator) {
        const oldBookFavoriteCreatorsIds: number[] = oldBook.favoriteCreators.map(favoriteCreator => favoriteCreator.id);
        const currentUserId: number = this.request.session.user.id;

        if (!oldBookFavoriteCreatorsIds.includes(currentUserId)) {
          return await BookEntity.query(`INSERT INTO security.user_favorite_book (favorite_book_id, user_id) VALUES (${id}, ${body.favoriteCreator.id})`);
        }

        if (oldBookFavoriteCreatorsIds.includes(currentUserId)) {
          return await BookEntity.query(`DELETE FROM security.user_favorite_book WHERE user_id = ${this.request.session.user.id} AND favorite_book_id = ${id}`);
        }
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

    if (!body.favoriteCreator && oldBook.creator.id !== this.request.session.user.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    try {
      return await BookEntity.update(id, body);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateBookPhoto(id, bookPhoto) {
    let oldBook: BookEntity;
    try {
      oldBook = await BookEntity.findOne(id, {
        relations: ['creator'],
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

    if (oldBook.creator.id !== this.request.session.user.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    try {
      return await BookEntity.update(id, { photo: bookPhoto });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id) {
    let oldBook: BookEntity;
    try {
      oldBook = await BookEntity.findOne(id, {
        relations: ['creator'],
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

    if (oldBook.creator.id !== this.request.session.user.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    try {
      return await BookEntity.delete(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}