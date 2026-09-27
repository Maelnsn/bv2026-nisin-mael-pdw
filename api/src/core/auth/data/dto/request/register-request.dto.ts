import { IsEmail, IsString, MaxLength } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail({}, { message: 'api.auth.register.error.email.invalid' })
  @MaxLength(320, { message: 'api.auth.register.error.email.too-long' })
  email!: string;
  @IsString({ message: 'api.auth.register.error.password.invalid' })
  @MaxLength(1024, { message: 'api.auth.register.error.password.too-long' })
  password!: string;
}
