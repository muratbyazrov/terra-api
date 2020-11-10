import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
    
    private readonly users: UserEntity[] = []

    findAll(): string {
        return `найти всех пользователей`
    }

    findOne(id: string):string {
        return `найти одного пользователя по id: ${id}`
    }
          
    create(user: UserEntity) {
        return user.save()
    }

    update(id: string): string {
        return `обновить пользователя с id ${id}`
    }

    delete(id: string):string {
        return `удалить пользователя с id ${id}`
    }    
    
}