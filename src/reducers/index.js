import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { categories, posts, post } from './PostReducer'
import { comments } from './CommentReducer'

export default combineReducers({
  categories,
  posts,
  post,
  comments,
  form: formReducer
})
