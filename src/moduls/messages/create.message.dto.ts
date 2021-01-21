import { IsNumber, IsString } from 'class-validator';


export class CreateMessageDto {
  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  text: string;

  @IsNumber({}, {
    message: 'Некорректно заполнено поле $property',
  })
  recipientId: number;

}