import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({
        message: 'Имя пользователя не может быть пустым'
    })
    @MinLength(6, {
        message: 'Минимальная длина пароля пользователя 6 символов'
    })
    firstName: string;

    @IsOptional()
    @IsString({
        message: 'Некорректно заполнено поле Отчество'
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
    @IsDate({
        message: 'Некорректно введена дата рождения'
    })
    birthday: number;

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