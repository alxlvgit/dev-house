import { database } from "../../model/fakeDB";

const getUsernameByUserId = (user_id: string): string | null => {
  const user = database.users.find((user) => user.id === user_id);
  return user ? user.firstName : null;
};

const getLikesByPostId = (post_id): string => {
  const likes = database.likes.filter((like) => like.post_id === post_id);
  return likes.length.toString();
};

const getPostByPostId = (post_id): object => {
  const post = database.posts.find((post) => post.id === post_id);
  return post ? post : null;
};

const getPostByUserId = (user_id): object => {
  const post = database.posts.find((post) => post.userId === user_id);
  return post ? post : null;
};

const getUserIdByUsername = (username: string): string => {
  const user = database.users.find((user) => user.username === username);
  return user ? user.id : null;
};
export { getUsernameByUserId, getLikesByPostId, getPostByPostId, getPostByUserId, getUserIdByUsername };
