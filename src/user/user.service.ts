import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) { }

	async create(createUserDto: CreateUserDto) {
		const user = this.userRepository.create(createUserDto);
		validate(user).catch(e => { throw e })
		return await this.userRepository.save(user);
	}

	findOne(email: string) {
		return this.userRepository.findOneBy({ email: email });
	}
}
