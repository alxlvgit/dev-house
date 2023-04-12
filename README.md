Breakdown of Work:

# March 6th (First Sprint Complete)

Oleksandr Levchuk
I worked on the following tasks:
1. Normalized database - This task is responsible for the proper database design.
2. Changed the interfaces according to the new database design - This task was responsible for implementation database related interfaces.

Selina Park
I worked on the following tasks: 
1. Conducted finalization of database normalization by adding votes, ensuring optimal functionality.

Royce Coviello
I worked on the following tasks:
1. Planning out how to create the sign in page
2. Reviewing provided starter code

# March 13th (Second Sprint Complete)

Oleksandr Levchuk
I worked on the following tasks:
1. Configured Passport.js to integrate the authentication services.
2. Initialized local strategy with Passport.js as a primary authentication strategy for the application.

Selina Park
I worked on the following tasks:
1. Worked on the "/posts" page that displays all posts of the currently logged-in user and their followers.
2. Showed the posts in a time-based order, with the most recent ones appearing first.
3. Made it so that when the user clicks on the comment icon, it shows a single post page.
4. Updated the single post page so that it loads any comments associated with that post.

Royce Coviello:
I worked on the following tasks:
1. Add basic signin

# March 27th (Third Sprint Complete)

Oleksandr Levchuk:
1. Added login and logout functionalities (user session creation, login and logout routes and handlers, displaying error messages on login).
2. Refactored Passport.js configuration and local strategy (Passport.js and local strategy config written in OOP way).
3. Added the session storage for production (Redis session storage will be used when env variable is set to "Production").

Selina Park:
I worked on the following tasks:
1. Debugged the comments section, and it's now functioning correctly.
2. Added a new feature that allows users to delete a specific post by clicking on the delete button on the post's page.
3. Changed the "getallpost" method by using a viewmodel for the post to make it more efficient.
4. Added a feature that allows users to create a new post by clicking on the "post" button. This feature is triggered by an onPOST request to the server.

Royce Coviello:
I worked on the following tasks:
1. Add added create id and username
2. Some error handling (check if email exists)

# April 3rd (Fourth Sprint Complete)

Oleksandr Levchuk:
1. Refactored Passport.js configuration and local strategy to follow the SOLID principles.
2. Made like/unlike icon functional - users can like or unlike the post by clicking on the icon. 
3. Implemented searching - users can input a search term and find the posts and other registered users that match the search key.
4. Added follow/unfollow functionality - on the page with search results users can follow or unfollow the other users in the list.
5. Added comments creation feature - users can add comments under the posts.

Selina Park:
I worked on the following tasks:
1. Debugged deleting post: Issue was that deleting post function was working with already-existing posts. However, couldn't delete newly-created posts.
2. Debugged adding new post: Issue was that when all posts were deleted, adding new post function didn't work. 
3. Fixed showallposts functions by implementing viewmodel. 

Royce Coviello:
I worked on the following tasks:
1. Password hashing on new user
2. Refractoring
3. Front end sign in error message functionality

# April 10th (Fifth Sprint Complete)

Selina Park:
I worked on the following tasks:
1. Debugging post functionality (when create new posts and delele new post, it takes oldest post to the top).
2. Wored on CSS; changed heart-button on posts.ejs and create new post box color to pink colour.

Oleksandr Levchuk:
I worked on the following tasks:
1. Fixed minor bugs after merging the main branch with new features. 
2. Auth error handling - directed the auth-related errors to the error middleware.
3. Created a new branch `db/prisma`. Currently, Auth and Post services have the full support of sqlite/prisma. Remaining tasks on branch:
- refactor Auth and Post services.
- add sqlite/prisma support for Search services.

Royce Coviello:
I worked on the following tasks:
1. Added middleware for error logging
