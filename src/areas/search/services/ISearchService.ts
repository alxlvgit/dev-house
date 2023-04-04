import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";

export default interface ISearchService {
    searchPosts(username: string, searchTerm: string): IPost[];
    searchUsers(searchTerm: string, userId): IUser[];
    followUnfollowTheUser(user_id: string, currentUserUsername: string): void;
}