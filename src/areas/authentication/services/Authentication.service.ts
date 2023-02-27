import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class AuthenticationService implements IAuthenticationService {
  // ⭐️ _db should be a reference to your real database driver
  readonly _db: any;
  async findUserByEmail(email: String): Promise<IUser> {
    // 🚀 Talk to your real database here
    throw new Error("Method not implemented.");
  }
  async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    // 🚀 Talk to your real database here
    throw new Error("Method not implemented.");
  }
  async createUser(user: IUser): Promise<IUser> {
    // 🚀 Talk to your real database here
    throw new Error("Method not implemented.");
  }
}
