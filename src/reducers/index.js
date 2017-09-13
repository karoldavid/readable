import {
	RECEIVE_CATEGORIES,
	RECEIVE_POSTS,
	RECEIVE_POST,
	SAVE_POST,
	DELETE_POST,
	SAVE_MODIFICATIONS,
	ADD_COMMENT,
	GET_COMMENTS,
	DELETE_COMMENT,
	SAVE_MOD_COMMENT,
	CHANGE_POST_VOTESCORE,
	CHANGE_COMMENT_VOTESCORE,
	SORT_BY_DIRECTION,
	SORT_BY_CATEGORY
} from '../actions'
 
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import _ from 'lodash'


function categories(state = [], action) {
	switch (action.type) {
  		case RECEIVE_CATEGORIES: 
      		return action.categories
    	default:
    		return state
  }
}

const initialPosts = {
  posts: [],
  postsOrderBy: 'timestamp',
  postsOrderDirection: 'desc',
}

function posts(state = initialPosts, action) {
	const posts = action.posts ? action.posts : state.posts
	const direction = action.ascDesc ? action.ascDesc : state.postsOrderDirection
	const category = action.category ? action.category : state.postsOrderBy

	console.log(state)

	switch (action.type) {
		case RECEIVE_POSTS:
			return { ...state, posts: _.orderBy(posts, [category],[direction]) }
		case SAVE_POST:
			return { ...state, posts: posts.concat(action.post) }
		case DELETE_POST:
		    const url = action.payload.url
		    const id = url.substr(url.indexOf("posts/") + ("posts/".length))
			return { ...state, posts: posts.filter((post) => id !== post.id) }
		case SAVE_MODIFICATIONS: 
			return { ...state, posts: posts.map((post) => post.id === action.payload.id ? action.payload : post) }
		case SORT_BY_DIRECTION:
			const postsOrderDirection = state.postsOrderDirection
			return { ...state, posts: _.orderBy(posts, [category],[direction]), postsOrderDirection: direction }
		case SORT_BY_CATEGORY:
			return { ...state, posts: _.orderBy(posts, [category]) }
		default:
			return state
	}
}

function post(state = {}, action) {
	switch (action.type) {
		case RECEIVE_POST:
			return action.post
		case CHANGE_POST_VOTESCORE:
			return action.payload
		default:
			return state
	}
}

function comments(state = [], action) {
	switch (action.type) {
		case ADD_COMMENT:
			return state.concat(action.comment)
		case GET_COMMENTS:
			return action.comments
		case DELETE_COMMENT:
			const url = action.payload.url
		    const id = url.substr(url.indexOf("comments/") + ("comments/".length))
			return state.filter((comment) => id !== comment.id)
		case SAVE_MOD_COMMENT:
			return state.map((comment) => comment.id === action.payload.id ? action.payload : comment);
		case CHANGE_COMMENT_VOTESCORE:
			return state.map((comment) => comment.id === action.payload.id ? action.payload : comment)
		default:
			return state
	}
}

export default combineReducers({
  categories,
  posts,
  post,
  comments,
  form: formReducer
})
