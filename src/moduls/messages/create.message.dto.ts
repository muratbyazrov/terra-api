import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  text: string;

}