import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST"
export const SAVE_POST = "SAVE_POST"
export const DELETE_POST = "DELETE_POST"
export const SAVE_MODIFICATIONS = "SAVE_MODIFICATIONS"
export const CHANGE_POST_VOTESCORE = "CHANGE_POST_VOTESCORE"
export const SORT_BY_DIRECTION = "SORT_BY_DIRECTION"
export const SORT_BY_CATEGORY = "SORT_BY_CATEGORY"

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