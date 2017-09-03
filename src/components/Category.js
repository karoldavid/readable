import React, { Component } from 'react'

class Category extends Component {
	render() {
		const category = this.props.match.params.catID
		return(
			<div>Category: {category}</div>
		)
	}
}

export default Category