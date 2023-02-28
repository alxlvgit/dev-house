import IComment from "./comment.interface";

interface IPost {
  id: string;
  message: string;
  userId: string;
  createdAt: Date;
  likes: number;
  commentList?: Array<string>;
  // comments: number;
}

export default IPost;
