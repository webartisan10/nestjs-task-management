import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(3, { message: 'Минимальное значение 3' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(6)
  password: string;
}
