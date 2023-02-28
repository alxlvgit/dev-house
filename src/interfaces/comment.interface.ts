interface IComment {
  id: string;
  message: string;
  userId: string;
  postId: string;
  createdAt: Date;
  parentCommentId: string;
}

export default IComment;
