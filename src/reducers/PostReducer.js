import {
	RECEIVE_POSTS,
	RECEIVE_POST,
	SAVE_POST,
	DELETE_POST,
	SAVE_MODIFICATIONS,
	CHANGE_POST_VOTESCORE,
	SORT_BY_DIRECTION,
	SORT_BY_CATEGORY
} from '../actions/PostActions'

import _ from 'lodash'

const initialPosts = {
  posts: [],
  postsOrderBy: 'timestamp',
  postsOrderDirection: 'desc',
}

export function posts(state = initialPosts, action) {
	const posts = action.posts ? action.posts : state.posts
	const direction = action.ascDesc ? action.ascDesc : state.postsOrderDirection
	const category = action.category ? action.category : state.postsOrderBy

	switch (action.type) {
		case RECEIVE_POSTS:
			return { ...state, posts: _.orderBy(posts, [category],[direction]) }
		case SAVE_POST:
			return { ...state, posts: posts.concat(action.post) }
		case DELETE_POST:
		    const url = action.payload.url
		    const id = url.substr(url.indexOf("posts/") + ("posts/".length))
			return { ...state, posts: posts.filter((post) => id !== post.id) }
		case SAVE_MODIFICATIONS: 
			return { ...state, posts: posts.map((post) => post.id === action.payload.id ? action.payload : post) }
		case SORT_BY_DIRECTION:
			const postsOrderDirection = state.postsOrderDirection
			return { ...state, posts: _.orderBy(posts, [category], [direction]), postsOrderDirection: direction }
		case SORT_BY_CATEGORY:
			const postsOrderBy = state.postsOrderBy
			return { ...state, posts: _.orderBy(posts, [category]), postsOrderBy: category }
		default:
			return state
	}
}

export function post(state = {}, action) {
	switch (action.type) {
		case RECEIVE_POST:
			return action.post
		case CHANGE_POST_VOTESCORE:
			return action.payload
		default:
			return state
	}
}