import { RECEIVE_CATEGORIES } from '../actions'
import { RECEIVE_POSTS } from '../actions'
import { RECEIVE_POST } from '../actions'
import { SAVE_POST } from '../actions'
import { DELETE_POST } from '../actions'
 
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

export default combineReducers({
  categories,
  posts,
  post,
  form: formReducer
})
