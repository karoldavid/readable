import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST"
export const SAVE_POST = "SAVE_POST"
export const DELETE_POST = "DELETE_POST"
export const SAVE_MODIFICATIONS = "SAVE_MODIFICATIONS"
export const ADD_COMMENT = "ADD_COMMENT"
export const GET_COMMENTS = "GET_COMMENTS"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const SAVE_MOD_COMMENT = "SAVE_MOD_COMMENT"
export const CHANGE_POST_VOTESCORE = "CHANGE_POST_VOTESCORE"
export const CHANGE_COMMENT_VOTESCORE = "CHANGE_COMMENT_VOTESCORE"
export const SORT_BY_DIRECTION = "SORT_BY_DIRECTION"
export const SORT_BY_CATEGORY = "SORT_BY_CATEGORY"

export const VOTESCORE_LOWEST_FIRST = "VOTESCORE_LOWEST_FIRST"

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  ReadableAPI
      .getAllCategories()
      .then(categories => dispatch(receiveCategories(categories)))
)

export const receivePosts = posts => ({
	type: RECEIVE_POSTS,
	posts
})

export const fetchPosts = () => dispatch => (
	ReadableAPI
		.getAllPosts()
		.then(posts => dispatch(receivePosts(posts)))
)

export const receivePost = post => ({
	type: RECEIVE_POST,
	post
})

export const fetchPost = (id) => dispatch => (
	ReadableAPI
		.getPost(id)
		.then(post => dispatch(receivePost(post)))
)

export const submitPost = post => ({
	type: SAVE_POST,
	post
})

export const savePost = (post, callback) => dispatch => (
	ReadableAPI
	.savePost(post)
	.then(post => dispatch(submitPost(post)))
	.then(() => callback())
)

export const deletePost = id => ({
	type: DELETE_POST,
	payload: id
})

export const removePost = (id, callback) => dispatch => (
	ReadableAPI
	.deletePost(id)
	.then(id => dispatch(deletePost(id)))
	.then(() => callback())
)

export const putPost = post => ({
	type: SAVE_MODIFICATIONS,
	payload: post
})

export const saveModifications = (post, callback) => dispatch => (
	ReadableAPI
	.saveModifications(post)
	.then(post => dispatch(putPost(post)))
	.then(() => callback())
)

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

export const changePostVoteScore = post => ({
	type: CHANGE_POST_VOTESCORE,
	payload: post
})

export const voteOnPost = (vote, id, callback) => dispatch => (
   ReadableAPI
   .votePost(vote, id)
   .then(post => dispatch(changePostVoteScore(post)))
   .then(() => callback())
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

export function sortPostsByDirection(ascDesc) {
  return {
    type: SORT_BY_DIRECTION,
    ascDesc
  }
}

export function sortPostsByCategory(category) {
	return {
		type: SORT_BY_CATEGORY,
		category
	}
}
