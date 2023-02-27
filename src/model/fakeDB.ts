import IDatabase from "../interfaces/database.interface.ts";

// Please feel free to not use this, or completely change it to your liking. It is just an example.
const database: IDatabase = {
  users: [
    {
      id: "1",
      email: "gates@gmail.com",
      password: "gates123",
      firstName: "Bill",
      lastName: "Gates",
      username: "billgates",
      posts: [
        {
          id: "abc1",
          userId: "billgates",
          message: "Microsoft is a nice company",
          createdAt: new Date(),
          likes: 3,
          comments: 0,
          commentList: [
            {
              id: "abc2",
              createdAt: "2012-01-09T11:25:13Z",
              userId: "billgates",
              message: "this is some random comment",
            },
          ],
        },
      ],
      following: [],
    },
    {
      id: "2",
      username: "james123",
      email: "james123@gmail.com",
      password: "james123",
      firstName: "James",
      lastName: "Smith",
      posts: [
        {
          id: "abc3",
          userId: "james123",
          message: "A post by james",
          createdAt: new Date(),
          likes: 30,
          comments: 12,
          commentList: [
            {
              id: "abc4",
              createdAt: "2012-01-05T04:13:24Z",
              userId: "billgates",
              message: "Cool post james. Glad I decided to follow you.",
            },
          ],
        },
        {
          id: "abc5",
          userId: "james123",
          message: "Nice weather today in Vancouver",
          createdAt: new Date(),
          likes: 30,
          comments: 12,
          commentList: [
            {
              id: "abc6",
              userId: "billgates",
              createdAt: "2012-02-05T05:13:24Z",
              message: "The weather is always nice when you're rich like me.",
            },
          ],
        },
      ],
      following: [],
    },
  ],
};

// -------- Note: I only created these as a simple test example for you, delete them later and use above db or your own --------------
const userDatabase = [
  {
    id: "1",
    firstName: "Armaan",
    lastName: "Armaan",
    email: "ad123@gmail.com",
    password: "ad123123!",
    role: "admin",
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Armaan",
    email: "jo123@gmail.com",
    password: "jo123",
    role: "user",
  },
];

const post = {
  postId: 5,
  userId: "john",
  createdAt: new Date(),
  message: "Hi there",
  comments: "1",
  likes: "2",
  commentList: ["cool post"],
}

const posts = [
  {
    postId: 5,
    userId: "john",
    createdAt: new Date(),
    message: "Hi there",
    comments: "1",
    likes: "2",
    commentList: ["cool post"],
  },
  {
    postId: 4,
    userId: "john",
    createdAt: new Date(),
    message: "this is a new post by me",
    comments: "1",
    likes: "2",
    commentList: ["cool post"],
  },
];

export { userDatabase, database, post, posts };
