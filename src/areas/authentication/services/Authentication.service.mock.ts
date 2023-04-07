import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";
import bcrypt from "bcrypt";
import WrongCredentialsException from "../../../exceptions/WrongCredentialsException";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
    const userFoundByEmail = await this.findUserByEmail(email);
    if (userFoundByEmail) {
      const bcryptPrefix = /^\$2b\$/;
      const passwordEncrypted = bcryptPrefix.test(userFoundByEmail.password);
      let passwordVerified = passwordEncrypted ? await bcrypt.compare(password, userFoundByEmail.password) : password === userFoundByEmail.password;
      if (passwordVerified) {
        return userFoundByEmail;
      }
      throw new WrongCredentialsException();
    }
  }

  public async findUserByEmail(email: String): Promise<IUser | null> {
    const user = await this._db.users.find((user) => user.email === email);
    if (user) {
      return user;
    } else {
      throw new WrongCredentialsException();
    }
  }

  public async createUser(user): Promise<IUser | null> {
    // check if email has been used
    const existingUser = this._db.users.find((u) => u.email === user.email);
    if (existingUser) {
      throw new EmailAlreadyExistsException(user.email);
    } else {
      // hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      const newUser: IUser = {
        id: (this._db.users.length + 1).toString(),
        ...user,
        password: hashedPassword,
        following: [],
        posts: [],
      };
      // add user to db
      this._db.users.push(newUser);
      console.log(this._db.users);
      return newUser;
    }
  }
}


