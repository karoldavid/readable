import { RECEIVE_CATEGORIES } from '../actions'

import { combineReducers } from 'redux'

function categories(state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES: 
      return action.categories
    default:
    return state
  }
}

export default combineReducers({
  categories
})
