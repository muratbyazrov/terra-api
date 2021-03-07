
import { IsOptional, IsString } from 'class-validator';

export class PostCreateDto {

  @IsOptional()
  photo: JSON;

  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  content: string;

}