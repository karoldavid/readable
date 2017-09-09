import {
	RECEIVE_CATEGORIES,
	RECEIVE_POSTS,
	RECEIVE_POST,
	SAVE_POST,
	DELETE_POST,
	SAVE_MODIFICATIONS,
	ADD_COMMENT
} from '../actions'
 
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

function categories(state = [], action) {
	switch (action.type) {
  		case RECEIVE_CATEGORIES: 
      		return action.categories
    	default:
    		return state
  }
}

function posts(state = [], action) {
	switch (action.type) {
		case RECEIVE_POSTS:
			return action.posts
		case SAVE_POST:
			return state.concat(action.post)
		case DELETE_POST:
		    const url = action.payload.url
		    const id = url.substr(url.indexOf("posts/") + ("posts/".length))
			return state.filter((post) => id !== post.id)
		case SAVE_MODIFICATIONS:
			return state.map((post) => post.id === action.payload.id ? action.payload : post);
		default:
			return state
	}
}

function post(state = {}, action) {
	switch (action.type) {
		case RECEIVE_POST:
			return action.post
		default:
			return state
	}
}

function comments(state = [], action) {
	switch (action.type) {
		case ADD_COMMENT:
			return state
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
