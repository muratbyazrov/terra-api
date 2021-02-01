import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../users/entity/user.entity';

export class UpdateBookDto {

  @IsOptional()
  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  name: string;

  @IsOptional()
  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  author: string;

  @IsOptional()
  photo: JSON;

  @IsOptional()
  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  comments: string;

  @IsOptional()
  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  genre: string;

  @IsOptional()
  @IsNumber({}, {
    message: 'Некорректно заполнено поле $property',
  })
  price: number;

  @IsOptional()
  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  town: string;

  @IsOptional()
  favoriteCreator: UserEntity;
}