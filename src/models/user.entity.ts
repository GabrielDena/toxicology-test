import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'users' })
@Unique(['email'])
class User {

	@PrimaryGeneratedColumn()
	id: number

	@IsNotEmpty()
	@Column("varchar", { length: 50 })
	email: string

	@Column("varchar", { length: 50 })
	name: string

	@IsNotEmpty()
	@Column("varchar", { length: 150 })
	password: string

	@Column("datetime")
	created_at: Date

	@Column("datetime")
	deleted_at: Date

}

export default User
