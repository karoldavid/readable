import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, removePost } from '../actions'
import { Link } from 'react-router-dom'

class ShowPost extends Component {
	componentDidMount() {
		const { id } = this.props.match.params
		this.props.getPost(id)
	}

	onDelete() {
		const { id } = this.props.post
		console.log(id)
		this.props.deletePost(id, () => {
			this.props.history.push('/')
		})
	}

	showPost(post) {
		return(
			<div>
				<h3>{post.title}</h3>
				<p>{post.category} {post.author} {post.voteScore}</p>
				<p>{post.body}</p>
				<Link to="/"><button className="btn waves-effect waves-light">Back to Main</button></Link>
				<Link to="/edit"><button className="btn waves-effect waves-light">Edit Post</button></Link>
				<button onClick={this.onDelete.bind(this)} className="btn waves-effect waves-light">Delete Post</button>
			</div>
		)
	}

	render() {
		const { post } = this.props

		if (!post) {
			return <div>Loading post... </div>
		}

		return(
			<div>{ this.showPost(post) }</div>
		)
	}
}

function mapStateToProps({ post }) {
	return { post }
}

function mapDispatchToProps(dispatch) {
	return {
		getPost: (id) => dispatch(fetchPost(id)),
		deletePost: (id, callback) => dispatch(removePost(id, callback))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost) 