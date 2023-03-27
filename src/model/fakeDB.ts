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
      following: ["3", "4", "5"],
      posts: ["1001"],
    },
    {
      id: "2",
      username: "james123",
      email: "james123@gmail.com",
      password: "james123",
      firstName: "James",
      lastName: "Smith",
      following: ["1"],
      posts: ["1002"],
    },
    {
      id: "3",
      username: "doe123",
      email: "doe123@gmail.com",
      password: "doe123",
      firstName: "Doe",
      lastName: "Don",
      following: ["2"],
      posts: ["1003"],
    },
    {
      id: "4",
      username: "selinapark",
      email: "selinasein@gmail.com",
      password: "selinasein123",
      firstName: "Selina",
      lastName: "Park",
      following: ["3"],
      posts: ["1004"],
    },
    {
      id: "5",
      username: "xiaoxiao",
      email: "xiaoxiao@gmail.com",
      password: "xiao123",
      firstName: "Xiao",
      lastName: "Zhang",
      following: ["3"],
      posts: ["1005"],
    },
    {
      id: "6",
      username: "Niki1234",
      email: "Niki123@gmail.com",
      password: "Niki123",
      firstName: "Niki",
      lastName: "Zhang",
      following: ["4"],
      posts: ["1006"],
    },
  ],

  posts: [
    {
      id: "1001",
      message: "Should show up 1/4: User's own post",
      userId: "1",
      createdAt: new Date("July 20, 2021 20:17:40"),
      comments: ["3001", "3002"],
    },
    {
      id: "1002",
      message: "Hi there 2",
      userId: "2",
      createdAt: new Date(),
      comments: ["3001", "3002"],
    },
    {
      id: "1003",
      message: "Should show up 2/4: User's following",
      userId: "3",
      createdAt: new Date("March 13, 2021 04:20"),
      comments: ["3001", "3002"],
    },
    {
      id: "1004",
      message: "Should show up 3/4: User's following",
      userId: "4",
      createdAt: new Date("October 2, 2021 11:05"),
      comments: ["3001", "3002"],
    },
    {
      id: "1005",
      message: "Should show up 4/4: User's following",
      userId: "5",
      createdAt: new Date("August 19, 2021 23:15:30"),
      comments: [],
    },
    {
      id: "1006",
      message: "this is a new post by me",
      userId: "6",
      createdAt: new Date(),
      comments: [],
    },
  ],

  comments: [
    {
      id: "3001",
      postId: "1001",
      userId: "1",
      createdAt: new Date(),
      message: "this is a new comment",
    },
    {
      id: "3002",
      postId: "1001",
      userId: "2",
      createdAt: new Date(),
      message: "this is one more comment",
    },
  ],

  likes: [
    { user_id: "1", post_id: "1002" },
    { user_id: "2", post_id: "1002" }, //Bill -> James
    { user_id: "4", post_id: "1002" },
    { user_id: "3", post_id: "1001" }, //Doe -> Bill
    { user_id: "4", post_id: "1001" },
  ],
};

export { database };
