import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class EditPost extends Component {

	render() {

		const { post } = this.props

		return(
			<div>Edit Post!
				<button type="submit" className="btn waves-effect waves-light">Save Post</button>
  				<Link to={{ pathname: `/posts/${post.id}`}}><button className="btn waves-effect waves-light">Cancel</button></Link>
  			</div>
		)
	}
}

function mapStateToProps( { post }) {
	return { post }
}

export default connect(mapStateToProps, null)(EditPost) 