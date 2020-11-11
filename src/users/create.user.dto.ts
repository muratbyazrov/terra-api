import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({
        message: 'Имя пользователя не может быть пустым'
    })
    @MinLength(2, {
        message: 'Имя должно содержать хотя бы 2 символа'
    })
    firstName: string;

    @IsOptional()
    @IsString({
        message: 'Некорректно заполнено поле Фамилия'
    })
    @MinLength(2, {
        message: 'Фамилия должна содержать хотя бы 2 символа'
    })
    lastName: string;

    @IsEmail({}, {
        message: 'Неправильный email адрес'
    })
    email: string;

    @IsNotEmpty({
        message: 'Пароль пользователя не может быть пустым'
    })
    @MinLength(6, {
        message: 'Минимальная длина пароля пользователя 6 символов'
    })
    password: string;

    @IsOptional()
    birthday: Date;

    @IsOptional()
    @IsString({
        message: 'Некорректно заполнено поле Пол'
    })
    sex: string;

    @IsOptional()
    @IsString({
        message: 'Некорректно заполнено поле Страна'
    })
    country: string;

    @IsOptional()
    @IsString({
        message: 'Некорректно заполнено поле Город'
    })
    town: string;

    @IsOptional()
    @IsString({
        message: 'Некорректно заполнено поле Адрес'
    })
    adress: string;

}