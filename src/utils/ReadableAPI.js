import uuidv1 from 'uuid'

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

export const savePost = (data) => {

	const post = {
        id: uuidv1(),
        timestamp: Date.now(),
        title: data.title,
        body: data.body,
        author: data.author,
        category: data.category
    }

	return fetch(`${api}/posts`, {
		method: 'POST',
		headers: {
			...headers,
			  'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	})
	.then(res => res.json())
	.then(data => data)
}

export const deletePost = (id) => {
	return fetch(`${api}/posts/${id}`, {
		method: 'DELETE',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		}
	})
	.then(res => res)
}

export const saveModifications = (data) => {
	const post = {
        title: data.title,
        body: data.body,
        author: data.author,
        category: data.category,
        voteScore: data.voteScore
    }
    const id = data.id

	return fetch(`${api}/posts/${id}`, {
		method:'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	})
	.then(res => res.json())
	.then(data => data)
}

export const votePost = (vote, id) => {

	return fetch(`${api}/posts/${id}`, {
		method:'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ option : vote })
	})
	.then(res => res.json())
	.then(data => data)
}

export const addComment = (data) => {

	const comment = {
        id: uuidv1(),
        timestamp: Date.now(),
        body: data.body,
        author: data.author,
        parentId: data.parentId
    }

	return fetch(`${api}/comments`, {
		method: 'POST',
		headers: {
			...headers,
			  'Content-Type': 'application/json'
		},
		body: JSON.stringify(comment)
	})
	.then(res => res.json())
	.then(data => data)
}

export const getPostComments = (id) => {
	return fetch(`${api}/posts/${id}/comments`, { headers })
		.then(res => res.json())
		.then(data => data)
}

export const deleteComment = (id) => {
	return fetch(`${api}/comments/${id}`, {
		method: 'DELETE',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		}
	})
	.then(res => res)
}

export const saveModifiedComment = (data) => {
	const comment = {
        body: data.body,
        voteScore: data.voteScore,
        timestamp: Date.now()
    }
    const id = data.id

	return fetch(`${api}/comments/${id}`, {
		method:'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(comment)
	})
	.then(res => res.json())
	.then(data => data)
}

export const voteComment = (vote, id) => {

	return fetch(`${api}/comments/${id}`, {
		method:'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ option : vote })
	})
	.then(res => res.json())
	.then(data => data)
}
