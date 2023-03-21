import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public getUserByEmailAndPassword(email: string, password: string): IUser | null {
    const userFoundByEmail = this.findUserByEmail(email);
    if (userFoundByEmail) {
      if (userFoundByEmail.password === password) {
        return userFoundByEmail;
      }
      throw new Error("Password is wrong. Please try again");
    }
  }

  public findUserByEmail(email: String): IUser | null {
    const user = this._db.users.find(user => user.email === email);
    if (user) {
      return user;
    } else {
      throw new Error("User with that email doesn't exist");
    }
  }

  public async createUser(user: any): Promise<IUser> {
    throw new Error("Method not implemented");
  }
}
