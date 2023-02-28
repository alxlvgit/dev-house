import IPost from "./post.interface";

export default interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  following?: Array<string>;
  posts?: Array<string>;
}
