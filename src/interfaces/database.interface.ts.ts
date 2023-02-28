import IComment from "./comment.interface";
import IPost from "./post.interface";
import IUser from "./user.interface";

export default interface IDatabase {
  users: IUser[];
  posts: IPost[];
  comments: IComment[];
}
