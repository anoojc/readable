import { combineReducers } from 'redux'
import {
	GET_ALL_CATEGORIES,
	GET_POST_FOR_CATEGORY,
	GET_ALL_POSTS,
	ADD_NEW_POST,
	GET_POST,
	UPVOTE_POST,
	DOWNVOTE_POST,
	EDIT_POST,
	DELETE_POST,
	GET_COMMENTS_FOR_POST,
	ADD_NEW_COMMENT,
	GET_COMMENT,
	UPVOTE_COMMENT,
	DOWNVOTE_COMMENT,
	EDIT_COMMENT,
	DELETE_COMMENT
} from '../actions'

const initialCategoryState = {categories: []}
const initialPostState = {posts: []}
const initialCommentState = {comments: []}

function category(state=initialCategoryState, action) {
	const {categories} = action

	switch(action.type) {
		case GET_ALL_CATEGORIES:
			return {
				...state,
				categories:[...categories]
			}
		default:
			return state	
	}
}

function post(state=initialPostState, action) {
	const {posts,categoryName,post} = action
	
	switch(action.type) {
		case GET_POST_FOR_CATEGORY:
			let otherPosts = state.posts.filter(p => p.category !== categoryName)
			let allPosts = otherPosts.concat(posts)
			return {
				...state,
				posts:[...allPosts]
			}
		case GET_ALL_POSTS:
			return state
		case ADD_NEW_POST:
			return state
		case UPVOTE_POST:
		case DOWNVOTE_POST:
			let existingPosts = state.posts
			let tempObj = existingPosts.find(p => p.id === post.id)
			tempObj.voteScore = post.voteScore
			return {
				...state,
				posts:[...existingPosts]
			}
		case GET_POST:
		case EDIT_POST:
		case DELETE_POST:
			let tempPosts = state.posts.filter(p => p.id !== post.id)
			tempPosts.push(post)
			return {
				...state,
				posts:[...tempPosts]
			}
		default:
			return state	
	}
}

function comment(state=initialCommentState, action) {
	const {comments,post,commentObj,comment} = action

	switch(action.type) {
		case GET_COMMENTS_FOR_POST:
			let otherComments = state.comments.filter(c => c.parentId !== post)
			let allComments = otherComments.concat(comments)
			return {
				...state,
				comments:[...allComments]
			}
		case ADD_NEW_COMMENT:
			let existingComments = state.comments
			existingComments.push(commentObj)
			return {
				...state,
				comments:[...existingComments]
			}
		case UPVOTE_COMMENT:
		case DOWNVOTE_COMMENT:
			existingComments = state.comments
			let tempObj = existingComments.find(c => c.id === comment.id)
			tempObj.voteScore = comment.voteScore
			return {
				...state,
				comments:[...existingComments]
			}
		case GET_COMMENT:	
		case EDIT_COMMENT:
		case DELETE_COMMENT:
			otherComments = state.comments.filter(c => c.id !== comment.id)
			otherComments.push(comment)
			return {
				...state,
				comments:[...otherComments]
			}
		default:
			return state
	}
}

export default combineReducers({
  category,
  post,
  comment
})