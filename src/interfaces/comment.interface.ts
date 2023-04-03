interface IComment {
  id: string;
  message: string;
  userId: string;
  postId: string;
  createdAt: Date;
  username: string;
}

export default IComment;
