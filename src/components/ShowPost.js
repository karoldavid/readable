import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../actions'

class ShowPost extends Component {
	componentDidMount() {
		const { id } = this.props.match.params
		this.props.getPost(id)
	}

	render() {
		return(
			<div>
				Show Post!
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPost: (id) => dispatch(fetchPost(id))
	}
}

export default connect(null, mapDispatchToProps)(ShowPost) 