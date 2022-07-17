import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/public.decorator';
import { CreateUserDto } from './user/dto/create-user.dto';
import { LoginUserDto } from './user/dto/login-user.dto';

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService) { }

	@Public()
	@Get()
	async home() {
		return 'Teste toxicológico';
	}

	@Public()
	@Post('auth/signin')
	async signin(@Body() user: LoginUserDto) {
		return this.authService.signIn(user);
	}

	@Public()
	@Post('auth/signup')
	async signup(@Body() createUserDto: CreateUserDto) {
		return this.authService.signUp(createUserDto)
	}
}
