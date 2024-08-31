import { IUser } from './user.model';
import { hashPassword, comparePasswords } from '../utils/helper/encrypt_password';
import { UserRepository } from './user.repository';
import { BadRequestError, NotFoundError } from '../utils/helper/custom_error';

export class UserService {
  private readonly userRepo;
  constructor() {
    this.userRepo = new UserRepository();
  }
  async createUser(data: IUser): Promise<IUser> {
    const user = await this.userRepo.findByEmail(data.email);
    if (user) {
      throw new BadRequestError('User already exists');
    }
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
    return await this.userRepo.create(data);
  }

  async login(data: IUser): Promise<IUser> {
    const { email, password } = data;
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundError('Not found');
    }
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestError('Password not match');
    }
    return user;
  }

  async getUser(userId: number): Promise<IUser> {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new NotFoundError('user not found');
    }
    return user;
  }
}
