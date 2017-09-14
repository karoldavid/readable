import {
	ADD_COMMENT,
	GET_COMMENTS,
	DELETE_COMMENT,
	SAVE_MOD_COMMENT,
	CHANGE_COMMENT_VOTESCORE,
	SORT_BY_DIRECTION,
	SORT_BY_CATEGORY
} from '../actions/CommentActions'

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
			return { ...state, comments: comments.concat(action.comment) }
		case GET_COMMENTS:
			return { ...state, comments: _.orderBy(comments, [category],[direction]) }
		case DELETE_COMMENT:
			const url = action.payload.url
		    const id = url.substr(url.indexOf("comments/") + ("comments/".length))
			return { ...state, comments: comments.filter((comment) => id !== comment.id) }
		case SAVE_MOD_COMMENT:
			return { ...state, comments: comments.map((comment) => comment.id === action.payload.id ? action.payload : comment) }
		case CHANGE_COMMENT_VOTESCORE:
			return { ...state, comments: comments.map((comment) => comment.id === action.payload.id ? action.payload : comment) }
		default:
			return state
	}
}