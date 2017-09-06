import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST"
export const SAVE_POST = "SAVE_POST"

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

export const submitPost = post => dispatch => ({
	type: SAVE_POST,
	post
})

export const savePost = (post) => dispatch => (
	ReadableAPI
	.savePost(post)
	.then(post => dispatch(submitPost(post)))
)