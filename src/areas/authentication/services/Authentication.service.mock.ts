import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser | null | Express.User> {
    const userFoundByEmail = await this.findUserByEmail(email);
    if (userFoundByEmail) {
      if (userFoundByEmail.password === password) return userFoundByEmail;
      throw new Error("Password is wrong. Please try again");
    }
    return null;
  }

  public async findUserByEmail(email: String): Promise<null | IUser | Express.User> {
    const user = this._db.users.find(user => user.email === email);
    if (user) {
      return user;
    } else {
    throw new Error("Email is wrong");
    }
  }

  public async createUser(user: any): Promise<IUser> {
    throw new Error("Method not implemented");
  }
}
