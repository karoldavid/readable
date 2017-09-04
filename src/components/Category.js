import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Category extends Component {

	render() {
		const category = this.props.match.params.catID
		const { posts } = this.props

		console.log(posts)
		return(
			<div>
				<h3>Category: {category}</h3>
				<ul>
					{posts.map((post) => (

						<li>{post.title}</li>
					))}

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