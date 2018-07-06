export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_POST_FOR_CATEGORY = 'GET_POST_FOR_CATEGORY'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const GET_POST = 'GET_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST= 'DELETE_POST'
export const GET_COMMENTS_FOR_POST= 'GET_COMMENTS_FOR_POST'
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'
export const GET_COMMENT = 'GET_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function getAllCategories(categories) {
	return {
		type: GET_ALL_CATEGORIES,
		categories
	}
}

export function getPostForCategory({posts,categoryName}) {
	return {
		type: GET_POST_FOR_CATEGORY,
		posts,
		categoryName
	}
}

export function getAllPosts(posts) {
	return {
		type: GET_ALL_POSTS,
		posts
	}
}

export function addNewPost(postObj) {
	return {
		type:ADD_NEW_POST,
		postObj
	}
}

export function getPost(post) {
	return {
		type: GET_POST,
		post
	}
}

export function upvotePost(post) {
	return {
		type: UPVOTE_POST,
		post
	}
}

export function downvotePost(post) {
	return {
		type: DOWNVOTE_POST,
		post
	}
}

export function editPost(post) {
	return {
		type: EDIT_POST,
		post
	}
}

export function deletePost(post) {
	return {
		type: DELETE_POST,
		post
	}
}

export function getCommentsForPost({comments,post}) {
	return {
		type: GET_COMMENTS_FOR_POST,
		comments,
		post
	}
}

export function addNewComment(commentObj) {
	return {
		type: ADD_NEW_COMMENT,
		commentObj
	}
}

export function getComment(comment) {
	return {
		type: GET_COMMENT,
		comment
	}
}

export function upvoteComment(comment) {
	return {
		type: UPVOTE_COMMENT,
		comment
	}
}

export function downvoteComment(comment) {
	return {
		type: DOWNVOTE_COMMENT,
		comment
	}
}

export function editComment(comment) {
	return {
		type: EDIT_COMMENT,
		comment
	}
}

export function deleteComment(comment) {
	return {
		type: DELETE_COMMENT,
		comment
	}
}