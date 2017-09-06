const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:5001'

let token = localStorage.token

if (!token)
	token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
	'Accept': 'application/json',
  	'Authorization': token
}

export const getAllCategories = () => {
	return fetch(`${api}/categories`, { headers })
    	.then(res => res.json())
    	.then(data => data.categories)
}

export const getAllPosts = () => {
	return fetch(`${api}/posts`, { headers })
		.then(res => res.json())
		.then(data => data)
}

export const getPost = (id) => {
	return fetch(`${api}/posts/${id}`, { headers })
		.then(res => res.json())
		.then(data => data)
}

export const savePost = (post) => {
	return fetch(`${api}/posts`, { post, headers })
		.then(res => res.json())
		.then(data => data)
}