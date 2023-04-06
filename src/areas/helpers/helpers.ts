import ILikes from "../../interfaces/likes.interface";
import { database } from "../../model/fakeDB";

interface postCreatorFullName {
  fname: string;
  lname: string;
}

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

const getFnameLnameByUserId = (user_id): postCreatorFullName => {
  const users = database.users;
  for (const user of users) {
    if (user_id === user.id) {
      return { fname: user.firstName, lname: user.lastName };
    }
  }
};


const getUserIdByUsername = (username: string): string => {
  const user = database.users.find((user) => user.username === username);
  return user ? user.id : null;
};


const getLikesByUserIdAndPostId = (user_id, post_id): ILikes => {
  const likes = database.likes;
  const result = likes.filter((like) => like.user_id === user_id && like.post_id === post_id);
  return result.length > 0 ? result[0] : null;
}

export { getUsernameByUserId, getLikesByPostId, getPostByPostId, getPostByUserId, getUserIdByUsername,getFnameLnameByUserId, getLikesByUserIdAndPostId };

