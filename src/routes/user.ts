import * as express from 'express';
import UserController from '../controllers/user.controller';

const userRoutes = express.Router();
const controller = new UserController();

userRoutes.post('/login', controller.autenticateUser);
userRoutes.post('/user', controller.createUser);

export default userRoutes;
