import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) { }

	async signIn(dto: AuthDto): Promise<any> {
		const user = await this.userService.findOne(dto.email);

		if (!user) throw new ForbiddenException('Credenciais incorretas');

		const pwMatches = await argon.verify(user.password, dto.password);

		if (!pwMatches) throw new ForbiddenException('Credenciais incorretas');

		delete user.password;

		return await this.signToken(user.id, user.email);
	}

	async signUp(createUserDto: CreateUserDto) {
		const user = await this.userService.findOne(createUserDto.email);
		if (user) {
			throw new BadRequestException(
				'E-mail já cadastrado.',
			);
		}
		createUserDto.password = await argon.hash(createUserDto.password);
		try {
			const user = await this.userService.create(createUserDto);
			return await this.signToken(user.id, user.email);
		} catch (e) {
			throw e
		}
	}

	private async signToken(userId: number, email: string): Promise<{ access_token: string }> {
		const payload = {
			sub: userId,
			email
		}
		const secret = process.env.JWT_SECRET
		const token = await this.jwtService.signAsync(payload, {
			expiresIn: '15m',
			secret: secret,
		})

		return {
			access_token: token,
		}

	}

}
