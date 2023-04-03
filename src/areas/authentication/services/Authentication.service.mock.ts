import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";
import bcrypt from "bcrypt";
export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;
  // database: any;

  public getUserByEmailAndPassword(email: string, password: string): IUser | null {
    const userFoundByEmail = this.findUserByEmail(email);
    if (userFoundByEmail) {
      if (userFoundByEmail.password === password) {
        return userFoundByEmail;
      }
      throw new Error("Password is wrong. Please try again");
    }
  }

  public findUserByEmail(email: string): IUser | null {
    const user = this._db.users.find((user) => user.email === email);
    return user || null;
  }

  private users: IUser[];

  constructor() {
    this.users = [];
  }

  public async createUser(user: IUser): Promise<IUser> {
    // check if email has been used
    const existingUser = this.users.find((u) => u.email === user.email);
    if (existingUser) {
      console.error(`User with email ${user.email} already exists`);
      return false;
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
