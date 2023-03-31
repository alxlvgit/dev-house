import IPost from "../../../interfaces/post.interface";
import IPostService from "../../../areas/post/services/IPostService";
import ISearchService from "./ISearchService";
import { getFnameLnameByUserId } from "../../../areas/helpers/helpers";
import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";


export class MockSearchService implements ISearchService {
    private _postService: IPostService;

    constructor(postService: IPostService) {
        this._postService = postService;
    }

    searchPosts(searchTerm: string, username: string): IPost[] {
        const allPosts = this._postService.getAllPosts(username);
        const postsSearchResult = allPosts.filter(post => (post.message.toUpperCase()).includes(searchTerm.toUpperCase()));
        return postsSearchResult.length > 0 ? this.enhancePostSearchResults(postsSearchResult) : null;
    }

    private enhancePostSearchResults = (posts: IPost[]): IPost[] => {
        return posts.map(post => {
            const { fname, lname } = getFnameLnameByUserId(post.userId);
            return { ...post, fname, lname };
        });
    }

    searchUsers(searchTerm: string, username: string): IUser[] {
        const users = database.users;
        const usersSearchResult = users.filter(user => (user.firstName.toUpperCase()).includes(searchTerm.toUpperCase()) || (user.lastName.toUpperCase()).includes(searchTerm.toUpperCase()));
        return usersSearchResult.length > 0 ? this.getUsersEnhanced(username, usersSearchResult) : null;
    }

    private getUsersEnhanced(username: string, users: IUser[]) {
        const followedByCurrentUser = database.users.find(user => user.username === username).following;
        return users.map(user => {
            return { ...user, isFollowed: followedByCurrentUser.includes(user.id) };
        })
    }

    followUnfollowTheUser = (user_id: string, currentUserUsername: string): void => {
        const currentUser = database.users.find(user => user.username === currentUserUsername);
        const usersFollowedByCurrentUser = currentUser.following;
        const indexOfCurrentUser = database.users.findIndex(user => user.username === currentUserUsername);
        if (!usersFollowedByCurrentUser.includes(user_id)) {
            database.users[indexOfCurrentUser].following.push(user_id);
            console.log(`Started following the user with id: ${user_id}`);
        } else {
            console.log("Unfollowed the user");
            const indexOfUserToUnfollow = database.users[indexOfCurrentUser].following.findIndex((userID) => user_id === userID);
            database.users[indexOfCurrentUser].following.splice(indexOfUserToUnfollow, 1);
        }
    }
}