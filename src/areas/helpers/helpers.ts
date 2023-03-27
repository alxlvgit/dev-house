import { database } from "../../model/fakeDB";

export const getUsernameByUserId = (user_id): string => {
  const users = database.users;
  for (const user of users) {
    if (user_id === user.id) {
      return user.firstName;
    }
  }
};

export const getLikesByPostId = (post_id): string => {
  const likes = database.likes;
  const result = likes.filter((like) => like.post_id === post_id);
  //if the post_id : "1001" then, the result =
  /*
   [{ user_id: "3", post_id: "1001" }, { user_id: "4", post_id: "1001" }]
  */

  return result.length.toString();
};
