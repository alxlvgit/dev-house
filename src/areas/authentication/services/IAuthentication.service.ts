// import IPost from "./post.interface";
import IUser from "../../../interfaces/user.interface";

export interface IAuthenticationService {
  _db: any;

  findUserByEmail(email: String): Promise<IUser | null>;

  createUser(user): Promise<IUser>;

  getUserByEmailAndPassword(email: string, password: string): Promise<IUser | null>;
}
