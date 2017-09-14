import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { convertTimestamp } from '../utils/helpers'

class Category extends Component {

	renderCategoryPostList(posts, category) {
		const matchingPosts = posts.filter(post => post.category === category && !post.deleted)

		return(
			matchingPosts.map((post) => (
			     <li key={post.id} className="collection-item">
                    <Link to={`/${category}/${post.id}`}>
                        {post.title} - {convertTimestamp(post.timestamp)} ({post.voteScore})
                    </Link>
                </li>
			))
		)
	}

	render() {
		console.log(this.props.match.params)
		const category = this.props.match.params.cat
		const { posts } = this.props.posts

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