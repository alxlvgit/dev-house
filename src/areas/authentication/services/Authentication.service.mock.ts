import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    throw new Error("Method not implemented");
  }

  public async findUserByEmail(email: String): Promise<null | IUser> {
    throw new Error("Method not implemented");
  }

  public async createUser(user: any): Promise<IUser> {
    throw new Error("Method not implemented");
  }
}
