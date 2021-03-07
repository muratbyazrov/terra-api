import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PostEntity } from './post.entity';
import { PostListEnum } from './post.list.enum';

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

      posts = await PostEntity.find();

      return posts;
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
    post.created = new Date();
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