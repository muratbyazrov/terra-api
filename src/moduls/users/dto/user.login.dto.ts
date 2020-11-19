import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginDto {
    @IsNotEmpty({
        message: 'Email не может быть пустым'
    })
    @IsEmail({},
        {
            message: 'Неверный формат Email'
        })
    email: string;

    @IsNotEmpty({
        message: 'Пароль не может быть пустым'
    })
    password: string;
}