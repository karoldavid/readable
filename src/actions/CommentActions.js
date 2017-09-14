import * as ReadableAPI from '../utils/ReadableAPI'

export const ADD_COMMENT = "ADD_COMMENT"
export const GET_COMMENTS = "GET_COMMENTS"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const SAVE_MOD_COMMENT = "SAVE_MOD_COMMENT"
export const CHANGE_COMMENT_VOTESCORE = "CHANGE_COMMENT_VOTESCORE"
export const SORT_BY_DIRECTION = "SORT_BY_DIRECTION"
export const SORT_BY_CATEGORY = "SORT_BY_CATEGORY"


export const submitComment = comment => ({
	type: ADD_COMMENT,
	comment
})

export const addComment = comment => dispatch => (
	ReadableAPI
	.addComment(comment)
	.then(comment => dispatch(submitComment(comment)))
)

export const receiveComments = comments => ({
	type: GET_COMMENTS,
	comments
})

export const fetchComments = id => dispatch => (
	ReadableAPI
	.getPostComments(id)
	.then(comments => dispatch(receiveComments(comments)))
)

export const removeComment = comment => ({
	type: DELETE_COMMENT,
	payload: comment
})

export const deleteComment = id => dispatch => (
	ReadableAPI
	.deleteComment(id)
	.then(comment => dispatch(removeComment(comment)))
)

export const putComment = comment => ({
	type: SAVE_MOD_COMMENT,
	payload: comment
})

export const saveModifiedComment = comment => dispatch => (
	ReadableAPI
	.saveModifiedComment(comment)
	.then(comment => dispatch(putComment(comment)))
)

export const changeCommentVoteScore = comment => ({
	type: CHANGE_COMMENT_VOTESCORE,
	payload: comment
})

export const voteOnComment = (vote, id, callback) => dispatch => (
   ReadableAPI
   .voteComment(vote, id)
   .then(comment => dispatch(changeCommentVoteScore(comment)))
   .then(() => callback())
)

export function sortCommentsByDirection(ascDesc) {
  return {
    type: SORT_BY_DIRECTION,
    ascDesc
  }
}

export function sortCommentsByCategory(category) {
	return {
		type: SORT_BY_CATEGORY,
		category
	}
}