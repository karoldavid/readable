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

export const savePost = (params) => {

	const post = {
        id: uuidv1(),
        timestamp: Date.now(),
        title: 'Announcing 60,000 Challenge Scholarships from Udacity and Google',
        body: 'Udacity and Google share a commitment to increasing learning opportunities for deserving students across the globe, and this mission has been the cornerstone of our partnership from the start. Most recently, we launched an ambitious scholarship initiative across Europe for aspiring Android developers. As a result, thousands of students earned the opportunity to master job-ready skills.',
        owner: 'Stuart Frye',
        category: 'udacity'
    }

    console.log(post)

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