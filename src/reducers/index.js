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
	SORT_BY_VOTESCORE
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
			return state.map((post) => post.id === action.payload.id ? action.payload : post)
		case SORT_BY_VOTESCORE:
			console.log(SORT_BY_VOTESCORE)
			console.log(action.orderBy)
			return _.orderBy(state, ['voteScore'],[action.orderBy]);
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
