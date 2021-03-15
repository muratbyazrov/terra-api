import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MessageEntity } from './message.entity';
import { UserService } from '../users/service/user.service';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class MessageService {
  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly request,
  ) {
  }

  async find() {
    return await MessageEntity.find({
      relations: ['creator', 'recipient'],
    });
  }

  catch(err) {
    throw new BadRequestException('[Messagervice_find]', err.message);
  }

  async findOne(id) {
    try {
      return await MessageEntity.findOne(id, {
        relations: ['creator', 'recipient'],
      });
    } catch (err) {
      throw new BadRequestException('[MessageService_findOne]', err.message);
    }
  }

  async create(message, recipientId) {
    try {
      message.creator = await this.userService.findOne(this.request.session.user.id);
      message.created = new Date();
      message.recipient = await this.userService.findOne(recipientId);
      return message.save();
    } catch (err) {
      throw new BadRequestException('[MessageService_create]', err.message);
    }
  }

  async update(id, body) {
    try {
      return await MessageEntity.update(id, body);
    } catch (err) {
      throw new BadRequestException('[MessageService_update]', err.message);
    }
  }

  async delete(id) {
    try {
      const deletedMessage = await this.findOne(id);
      deletedMessage.deleted = true;
      delete deletedMessage.id;
      return await this.update(id, deletedMessage);
    } catch (err) {
      throw new BadRequestException('[MessageService_delete]', err.message);
    }
  }
}