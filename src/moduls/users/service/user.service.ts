import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { UserEntity } from '../entity/user.entity';
import jwt = require('jsonwebtoken');
import { AccessTokenEntity } from '../entity/access.token.entity';

@Injectable()
export class UserService {

  async findAll() {
    try {
      return UserEntity.find();
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  findOne(id) {
    try {
      return UserEntity.findOne(id);
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  create(user: UserEntity) {
    try {
      return user.save();
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  async update(id: string, body: CreateUserDto) {
    try {
      return await UserEntity.update(id, body);
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  async delete(id: string) {
    try {
      return await UserEntity.delete(id);
    } catch (err) {
      throw new HttpException(err.message, 400);
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
    await AccessTokenEntity.save(t);

    return { user, token: result.token };
  }

}