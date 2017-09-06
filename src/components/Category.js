import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Category extends Component {

	renderCategoryPostList(posts, category) {
		const matchingPosts = posts.filter(post => post.category === category)

		return(

			matchingPosts.map((post) => (
				<li key={post.id} className="collection-item">{post.title}</li>
			))
		)
	}

	render() {
		const category = this.props.match.params.cat
		const { posts } = this.props

		return(
			<div>
				<h3>Category: {category}</h3>
				<ul className="collection">
					{this.renderCategoryPostList(posts, category)}
				</ul>
				<Link to="/"><button className="btn waves-effect waves-light">Back to Main</button></Link>
			</div>
		)
	}
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(Category)