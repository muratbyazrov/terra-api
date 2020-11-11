import { HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./create.user.dto";
import { UserEntity } from "./user.entity";

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
            return await UserEntity.update(id, { deleted: true })
        } catch (err) {
            throw new HttpException(err.message, 400);
        }
    }

}