import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

  @MinLength(2, {
    message: 'Имя должно содержать хотя бы 2 символа',
  })
  firstName: string;

  @MinLength(2, {
    message: 'Фамилия должна содержать хотя бы 2 символа',
  })
  lastName: string;

  @IsEmail({}, {
    message: 'Неправильный email адрес',
  })
  email: string;

  @MinLength(6, {
    message: 'Минимальная длина пароля 6 символов',
  })
  password: string;

  @IsOptional()
  birthday: Date;

  @IsOptional()
  @IsString({
    message: 'Некорректно заполнено поле Пол',
  })
  sex: string;

  @IsOptional()
  @IsString({
    message: 'Некорректно заполнено поле Страна',
  })
  country: string;

  @IsOptional()
  @IsString({
    message: 'Некорректно заполнено поле Город',
  })
  town: string;

  @IsOptional()
  @IsString({
    message: 'Некорректно заполнено поле Адрес',
  })
  address: string;

  @IsOptional()
  @IsString({
    message: 'Некорректно заполнено поле $property',
  })
  about: string;

  @IsOptional()
  avatar: string;

}