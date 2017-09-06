import { RECEIVE_CATEGORIES } from '../actions'
import { RECEIVE_POSTS } from '../actions'
import { RECEIVE_POST } from '../actions'
import { SAVE_POST }

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
		default:
			return state
	}
}

function post(state = {}, action) {
	switch (action.type) {
		case RECEIVE_POST:
			return action.post
		case SAVE_POST:
			console.log("SAVE_POST")
			return state
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
