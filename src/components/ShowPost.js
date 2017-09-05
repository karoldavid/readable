import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../actions'

class ShowPost extends Component {
	componentDidMount() {
		const { id } = this.props.match.params
		this.props.getPost(id)
	}

	showPost(post) {
		return(
			<div>
				<h3>{post.title}</h3>
				<p>{post.category} {post.author} {post.voteScore}</p>
				<p>{post.body}</p>
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
		getPost: (id) => dispatch(fetchPost(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost) 