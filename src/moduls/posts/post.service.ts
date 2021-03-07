import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(@Inject(REQUEST) private readonly request) {
  }

  async find() {
    try {
      return await PostEntity.find({
        where: {
          creator: { id: this.request.session.user.id },
        },
      });
    } catch (e) {
      throw new BadRequestException('[PostService_find]', e.message);
    }
  }

  async findOne(id) {
    try {
      return await PostEntity.findOne(id);
    } catch (e) {
      throw new BadRequestException('[PostService_findOne]', e.message);
    }
  }

  async create(post) {
    post.created = Date.now();
    post.creator = this.request.session.user;
    try {
      return post.save();
    } catch (e) {
      throw new BadRequestException('[PostService_findOne]', e.message);
    }
  }

  async update(id, body) {
    const updatablePost = await this.findOne(id);

    if (updatablePost.creator.id !== this.request.session.user.id) {
      throw new ForbiddenException('Недостаточно прав на удадение книги');
    }

    return await PostEntity.update(id, body);
  }

  async delete(id) {
    const deletedPost = await this.findOne(id);

    if (deletedPost.creator.id !== this.request.session.user.id) {
      throw new ForbiddenException('Недостаточно прав на удадение книги');
    }

    return await PostEntity.delete(id);
  }
}