import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import WrongCredentialsException from "../../../exceptions/WrongCredentialsException";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

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

  public async createUser(user: any): Promise<IUser> {
    throw new Error("Method not implemented");
  }
}
