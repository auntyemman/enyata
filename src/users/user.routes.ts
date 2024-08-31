import { Router } from 'express';
import { UserController } from './user.controller';
import { authUser } from '../utils/middlewares/auth';
import { bindMethods } from '../utils/helper/bind_method';

export const user: Router = Router();
const userController = new UserController();
const userCont = bindMethods(userController);

user.post('/auth/signup', userCont.signUp);
user.post('/auth/login', userCont.login);
user.get('/users/:id', authUser, userCont.getUser);
