import { compare, hash } from 'bcrypt';
import IUser from '../../../interfaces/user.interface';
import { PrismaClient } from '@prisma/client';
import { IAuthenticationService } from './IAuthentication.service';
import WrongCredentialsException from '../../../exceptions/WrongCredentialsException';
import EmailAlreadyExistsException from '../../../exceptions/EmailAlreadyExists';

export class AuthenticationService implements IAuthenticationService {

  readonly _db: PrismaClient;

  constructor(db: PrismaClient) {
    this._db = db;
  }

  async findUserByEmail(email: String): Promise<IUser> {
    const user = await this._db.user.findUnique({ where: { email } });
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    const user = await this.findUserByEmail(email);
    if (user) {
      const passwordVerified = await compare(password, user.password);
      if (passwordVerified) {
        return user;
      }
      console.log('Wrong password');
      throw new WrongCredentialsException();
    }
    console.log('Email not found');
    throw new WrongCredentialsException();
  }

  async createUser(user): Promise<IUser> {
    const existingUser = await this.findUserByEmail(user.email);
    if (existingUser) {
      throw new EmailAlreadyExistsException(user.email);
    } else {
      const hashedPassword = await hash(user.password, 10);
      const newUser = await this._db.user.create({
        data: {
          ...user,
          password: hashedPassword
        }
      });
      return newUser;
    }
  }
}
