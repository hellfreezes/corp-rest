import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @Length(8, 100)
  password: string;
}
