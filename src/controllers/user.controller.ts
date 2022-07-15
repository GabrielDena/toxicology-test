import * as express from 'express';
import { userRepository } from '../repositories/user.repository';
import { validate } from 'class-validator';

class UserController {
	createUser = async (request: express.Request, response: express.Response) => {
		const user = userRepository.create(request.body);
		const errors = await validate(user);
		if (errors.length > 0) {
			return response.status(422).json(errors);
		} else {
			return response.json(userRepository.save(user));
		}
	};

	autenticateUser = async (request: express.Request, responde: express.Response) => {
		const user = userRepository.findOneBy({
			email: request.body.email,
			password: request.body.password
		})

		return express.response.json('JWT');
	}
}

export default UserController
