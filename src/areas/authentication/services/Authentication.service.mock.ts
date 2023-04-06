import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";
import bcrypt from "bcrypt";
import WrongCredentialsException from "../../../exceptions/WrongCredentialsException";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;
  // database: any;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
    const userFoundByEmail = await this.findUserByEmail(email);
    if (userFoundByEmail) {
      if (userFoundByEmail.password === password) {
        return userFoundByEmail;
      }
      throw new WrongCredentialsException();
    }
  }

  public async findUserByEmail(email: String): Promise<IUser | null> {
    const user = await this._db.users.find(user => user.email === email);
    if (user) {
      return user;
    } else {
      throw new WrongCredentialsException();
    }
  }

  private users: IUser[];

  constructor() {
    this.users = [];
  }

  public async createUser(user: IUser): Promise<IUser | null> {
    // check if email has been used
    const existingUser = this.users.find((u) => u.email === user.email);
    if (existingUser) {
      console.error(`User with email ${user.email} already exists`);
      return null;
    } else {
      // hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      const newUser: IUser = {
        id: (this.users.length + 1).toString(),
        ...user,
        password: hashedPassword,
        following: [],
        posts: [],
      };
      // add user to db
      database.users.push(newUser);
      console.log(database.users);
      return newUser;
    }
  }
}
