# Readable API Server

This is my Readable project that is a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Features
	- Root page shows the list of all the posts of each category with required details.  This page also has sorting functionality for posts.
	- All posts for a category are shown at /:categoryName . This page also has sorting functionality for posts.
	- Both of the above page has provision to add new post to a cateegory
	- Details of a post are shown at /:category/:post_id . This page also shows required details of comments available for the post. User can also perform differnt operations for comments on this page. This page also has sorting functionality for comments.
	- User can add a new post at /post/create .
	- User can update the existing post at /post/update/:postId .
	- A 404 page is diplayed when user tries to access deleted posts's url.
	- User can navigate back to previous page using back button from all the pages.

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, use Create React App to scaffold out the front-end
    - `create-react-app frontend`
    - `cd frontend`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Dependencies
This project uses following dependencies :
* react
* redux
* react-router-dom
* react-dom
* react-redux
* redux-thunk
* uuid
* bootstrap
* material-design-icons
