interface IComment {
  id: string;
  message: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

export default IComment;
