interface IPost {
  id: string;
  message: string;
  userId: string;
  createdAt: Date;
  comments?: Array<string>;
}

export default IPost;
