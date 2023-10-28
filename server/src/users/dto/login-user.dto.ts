import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'email@example.ru',
    description: 'E-Mail адрес',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'qwerty',
    description: 'Пароль',
  })
  @IsNotEmpty()
  password: string;
}
