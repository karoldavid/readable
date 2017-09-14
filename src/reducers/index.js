import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { categories } from './CategoryReducer'
import { posts, post } from './PostReducer'
import { comments } from './CommentReducer'

export default combineReducers({
  categories,
  posts,
  post,
  comments,
  form: formReducer
})
