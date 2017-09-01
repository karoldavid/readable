import { RECEIVE_CATEGORIES } from '../actions'
import { RECEIVE_POSTS } from '../actions'

import { combineReducers } from 'redux'

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

export default combineReducers({
  categories,
  posts
})
