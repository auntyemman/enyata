import { Request, Response, NextFunction } from 'express';

import { UserService } from './user.service';
import { validateRequest } from '../utils/helper/request_validator';
import { SignUpDTO, SignInDTO, UpdateDTO } from './user.dto';
import { createJWT } from '../utils/helper/jwt';
import { APIError } from '../utils/helper/custom_error';

export class UserController {
  private readonly userService;
  constructor() {
    this.userService = new UserService();
  }

  async signUp(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    try {
      const validated = await validateRequest(SignUpDTO, req.body);
      const user = await this.userService.createUser(validated);
      if (!user) {
        throw new APIError('Failed to create user');
      }
      const { id, email } = user;
      return res.status(201).json({
        status: 'success',
        message: `Registration successful`,
        data: {
          id: id,
          email: email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    try {
      const validated = await validateRequest(SignInDTO, req.body);
      const user = await this.userService.login(validated);
      const accessToken = await createJWT({
        userId: user.id,
        email: user.email,
      });
      return res.status(200).json({
        status: 'success',
        message: 'Logged in successfully',
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.getUser(id);
      return res.status(200).json({
        status: 'success',
        message: 'User fetched successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<object | undefined> {
    const { userId } = res.locals.user;
    try {
      const validated = await validateRequest(UpdateDTO, req.body);
      const updatedUser = await this.userService.updateUser(userId, validated);
      return res.status(200).json({
        status: 'success',
        message: 'user updated succesfully',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
