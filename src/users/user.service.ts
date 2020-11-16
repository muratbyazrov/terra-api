import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./create.user.dto";
import { UserEntity } from "./user.entity";
import jwt = require('jsonwebtoken');

@Injectable()
export class UserService {

    async findAll() {
        try {
            return UserEntity.find()
        } catch (err) {
            throw new HttpException(err.message, 400);
        }
    }

    findOne(id) {
        try {
            return UserEntity.findOne(id)
        } catch (err) {
            throw new HttpException(err.message, 400);
        }
    }

    create(user: UserEntity) {
        try {
            return user.save()
        } catch (err) {
            throw new HttpException(err.message, 400);
        }
    }

    async update(id: string, body: CreateUserDto) {
        try {
            return await UserEntity.update(id, body)
        } catch (err) {
            throw new HttpException(err.message, 400);
        }
    }

    async delete(id: string) {
        try {
            return await UserEntity.delete(id)
        } catch (err) {
            throw new HttpException(err.message, 400);
        }
    }

    async login(login) {

        const user = await UserEntity.findOne({
            where: { email: login.email, password: login.password }
        })

        if(!user) {
            throw new UnauthorizedException('Неправльная почта или пароль');
        }

        const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5;

        const tokenData = {
            exp: expiration,
            email: user.email,
            id: user.id
        }

        const result = {
            email: user.email,
            token: jwt.sign(tokenData, 'terra-key')
        }

        return { user, token: result.token };
    }

}