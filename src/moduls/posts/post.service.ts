import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PostEntity } from './post.entity';
import { PostListEnum } from './post.list.enum';
import * as moment from 'moment';
import { logger } from '../logger/logger';

@Injectable()
export class PostService {
  constructor(@Inject(REQUEST) private readonly request) {
  }

  async find(filter) {
    let posts: PostEntity[];

    try {
      if (filter.postList && filter.postList === PostListEnum.MY_POST_LIST) {
        posts = await PostEntity.find({
          where: {
            creator: { id: this.request.session.user.id },
          },
        });
      }

      posts = await PostEntity.find({
        relations: ['creator'],
      });

      posts.sort((a, b) => {
        if (moment(a.created).isBefore(b.created)) {
          return 1;
        }

        if (moment(a.created).isAfter(b.created)) {
          return -1;
        }

        if (moment(a.created).isSame(b.created)) {
          return 0;
        }
      });

      return posts;
    } catch (e) {
      logger.error(e);
      throw new BadRequestException('[PostService_find]', e.message);
    }
  }

  async findOne(id) {
    try {
      return await PostEntity.findOne(id);
    } catch (e) {
      logger.error(e);
      throw new BadRequestException('[PostService_findOne]', e.message);
    }
  }

  async create(post) {
    post.created = new Date();
    post.creator = this.request.session.user;
    try {
      return post.save();
    } catch (e) {
      logger.error(e);
      throw new BadRequestException('[PostService_findOne]', e.message);
    }
  }

  async update(id, body) {
    const updatablePost = await this.findOne(id);

    if (updatablePost.creator.id !== this.request.session.user.id) {
      throw new ForbiddenException('Недостаточно прав на удадение книги');
    }

    try {
      await PostEntity.update(id, body);
    } catch (e) {
      logger.error(e);
      throw new BadRequestException('[PostService_update]', e.message);
    }
  }

  async delete(id) {
    const deletedPost = await this.findOne(id);

    if (deletedPost.creator.id !== this.request.session.user.id) {
      throw new ForbiddenException('Недостаточно прав на удадение книги');
    }

    try {
      await PostEntity.delete(id);
    } catch (e) {
      logger.error(e);
      throw new BadRequestException('[PostService_update]', e.message);
    }
  }
}