import { IsDefined, IsString } from 'class-validator';
import { ManyToOne } from 'typeorm';
import { UserEntity } from '../users/entity/user.entity';

export class CreateMessageDto {
  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  text: string;

  @IsDefined({
    message: 'Не заполнено поле $property'
  })
  recipient: UserEntity;

}