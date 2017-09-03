import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Category extends Component {
	render() {
		const category = this.props.match.params.catID
		return(
			<div>
				<div>Category: {category}</div>
				<Link to="/"><button className="btn waves-effect waves-light">Back to Main</button></Link>
			</div>
		)
	}
}

export default Category