import IComment from "./comment.interface";

interface IPost {
  id: string;
  message: string;
  userId: string;
  createdAt: Date;
  comments?: Array<string | IComment>;
  likes?: string;
}

export default IPost;
