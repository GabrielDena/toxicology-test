import { IsEmail, IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class LoginUserDto {
	@IsEmail()
	@IsNotEmpty({ message: 'E-mail obrigatório.' })
	email: string

	@IsNotEmpty({ message: 'Senha obrigatória.' })
	@MinLength(8, { message: 'A senha precisa ter no mínimo 8 caracteres.' })
	password: string
}
