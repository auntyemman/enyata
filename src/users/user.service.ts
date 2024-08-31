import base64url from 'base64url';
import { IUser } from './user.model';
import { hashPassword, comparePasswords } from '../utils/helper/encrypt_password';
import { UserRepository } from './user.repository';
import { sendVerifyEmail } from '../utils/helper/send_verify_email';
import { createJWT, verifyJWT } from '../utils/helper/jwt';
// import { forgotPasswordMail } from '../utils/emails/senderFunctions/forgotPassword';
import { BadRequestError, NotFoundError } from '../utils/helper/custom_error';
import { JWTPayload } from '../utils/helper/jwt_type';

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

  // async deleteUser(id: string): Promise<IUser> {
  //   return await this.userRepo(id);
  // }

  // async verifyUserMail(token: string): Promise<IUser> {
  //   const decoded = await this.verifyDecodedToken(token);
  //   id = parseInt(decoded.userId);
  //   const user = await this.userRepo.findById(decoded.userId);
  //   if (user.metaData.isActive === true) {
  //     throw new BadRequestError('User already verified');
  //   }
  //   user.metaData.isActive = true;
  //   await this.userRepo.update(decoded.userId, user);
  //   return user;
  // }

  // async forgotPassword(email: string): Promise<IUser | null> {
  //   const user = await this.userRepo.getByEmail(email);
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   const rawToken = await createJWT({
  //     userId: user._id,
  //     role: user.role,
  //     email: user.email,
  //   });
  //   const token = base64url(rawToken);
  //   const frontendUrl = process.env.FRONTEND_BASE_URL;
  //   const link: string = `${frontendUrl}/auth/password-reset/${token}`;
  //   await forgotPasswordMail(user, link);
  //   return user;
  // }

  // async resetPassword(data: ResetPasswordDTO): Promise<IUser> {
  //   const decoded = await this.verifyDecodedToken(data.token);
  //   const user = await this.userRepo.getOne(decoded.userId);
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   const hashedPassword = await hashPassword(data.password);
  //   user.password = hashedPassword;
  //   await this.userRepo.update(user._id, user);
  //   return user;
  // }

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

  private async verifyDecodedToken(token: string): Promise<JWTPayload> {
    const decodedToken = base64url.decode(token);
    const decoded = await verifyJWT(decodedToken);
    if (!decoded) {
      throw new BadRequestError('Invalid token');
    }
    return decoded;
  }
}
