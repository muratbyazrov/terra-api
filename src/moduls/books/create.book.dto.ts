import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {

  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  name: string;

  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  author: string;

  @IsOptional()
  photo: JSON;

  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  comments: string;

  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  genre: string;

  @IsNumber({}, {
    message: 'Некорректно заполнено поле $property',
  })
  price: number;

}