import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique(['email'])
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	@IsEmail()
	@IsNotEmpty({ message: 'E-mail obrigatório.' })
	email: string

	@Column()
	@IsNotEmpty({ message: 'Senha obrigatória.' })
	password: string

	@Column({ nullable: true })
	@IsString()
	firstName: string

	@Column({ nullable: true })
	@IsString()
	lastName: string
}
