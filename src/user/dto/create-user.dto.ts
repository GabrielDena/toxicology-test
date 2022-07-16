import { IsEmail, IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty({ message: 'E-mail obrigatório.' })
	email: string

	@IsNotEmpty({ message: 'Senha obrigatória.' })
	@MinLength(8, { message: 'A senha precisa ter no mínimo 8 caracteres.' })
	password: string

	@IsString()
	@IsOptional()
	firstName?: string

	@IsString()
	@IsOptional()
	lastName?: string
}
