import {
	ADD_COMMENT,
	GET_COMMENTS,
	DELETE_COMMENT,
	SAVE_MOD_COMMENT,
	CHANGE_COMMENT_VOTESCORE,
	SORT_BY_DIRECTION,
	SORT_BY_CATEGORY
} from '../actions'

import _ from 'lodash'

const initialComments = {
  comments: [],
  commentsOrderBy: 'timestamp',
  commentsOrderDirection: 'desc',
}

export function comments(state = initialComments, action) {
	const comments = action.comments ? action.comments : state.comments
	const category = 'timestap'
	const direction = 'desc'

	switch (action.type) {
		case ADD_COMMENT:
			return state.concat(action.comment)
		case GET_COMMENTS:
			const comments = action.comments
			return { ...state, comments: _.orderBy(comments, [category],[direction]) }
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