import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EditPost extends Component {
	render() {
		return(
			<div>Edit Post!
				<button type="submit" className="btn waves-effect waves-light">Save Post</button>
  				<Link to="/"><button className="btn waves-effect waves-light">Cancel</button></Link>
  			</div>
		)
	}
}

function dispatchStateToProps( { post }) {
	return { post }
}

export default EditPost