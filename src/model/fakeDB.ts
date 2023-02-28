import IDatabase from "../interfaces/database.interface.ts";

const database: IDatabase = {
  users: [
    {
      id: "1",
      username: "billgates",
      email: "gates@gmail.com",
      password: "gates123",
      firstName: "Bill",
      lastName: "Gates",
      following: [],
      posts: ["1001"]
    },
    {
      id: "2",
      username: "james123",
      email: "james123@gmail.com",
      password: "james123",
      firstName: "James",
      lastName: "Smith",
      following: ["1"],
      posts: ["1002"]
    },
  ],

  posts: [
    {
      id: "1001",
      message: "Hi there",
      userId: "1",
      createdAt: new Date(),
      likes: 2,
      commentList: ["3001", "3002"]
    },
    {
      id: "1002",
      message: "this is a new post by me",
      userId: "2",
      createdAt: new Date(),
      likes: 2,
      commentList: []
    },
  ],

  comments: [
    {
      id: "3001",
      postId: "1001",
      userId: "1",
      createdAt: new Date(),
      message: "this is a new comment",
      parentCommentId: ""
    },
    {
      id: "3002",
      postId: "1001",
      userId: "2",
      createdAt: new Date(),
      message: "this is one more comment",
      parentCommentId: ""
    }
  ]
};

export { IDatabase };
