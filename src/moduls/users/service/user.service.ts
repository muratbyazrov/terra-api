import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import jwt = require('jsonwebtoken');
import { AccessTokenEntity } from '../entity/access.token.entity';
import { UpdateUserDto } from '../dto/update.user.dto';
import { logger } from '../../logger/logger';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UserService {
  constructor(@Inject(REQUEST) private readonly request) {
  }

  async find() {
    try {
      return UserEntity.find();
    } catch (err) {
      logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id) {
    try {
      return await UserEntity.findOne(id);
    } catch (err) {
      logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  create(user: UserEntity) {
    try {
      return user.save();
    } catch (err) {
      logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, body: UpdateUserDto, avatar) {
    const oldUser: UserEntity = await this.findOne(id);

    if (oldUser.id !== this.request.session.user.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    try {
      if (avatar) {
        const avatarObject = {
          avatar: avatar,
        };
        await UserEntity.update(id, avatarObject);
      } else {
        return await UserEntity.update(id, body);
      }
    } catch (err) {
      logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    const oldUser: UserEntity = await this.findOne(id);

    if (oldUser.id !== this.request.session.user.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    try {
      return await UserEntity.delete(id);
    } catch (err) {
      logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(login) {

    const user = await UserEntity.findOne({
      where: { email: login.email, password: login.password },
    });

    if (!user) {
      throw new UnauthorizedException('Неправльная почта или пароль');
    }

    const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 дней

    const tokenData = {
      exp: expiration,
      email: user.email,
      id: user.id,
    };

    const result = {
      email: user.email,
      expires: expiration,
      token: jwt.sign(tokenData, 'terra-key'),
    };

    const t: any = {};

    t.token = result.token;
    t.expires = tokenData.exp;
    t.user = user;

    await AccessTokenEntity.query(`DELETE FROM security.access_token WHERE user_id = ${user.id}`);

    await AccessTokenEntity.save(t);

    return { user, token: result.token };
  }

}