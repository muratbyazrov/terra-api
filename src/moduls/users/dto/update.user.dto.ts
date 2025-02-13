import { CreateUserDto } from './create.user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends CreateUserDto {

  @IsOptional()
  email: string

  @IsOptional()
  password: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  avatar: any;

}