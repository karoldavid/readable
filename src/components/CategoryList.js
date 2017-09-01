import React, { Component } from 'react'


class CategoryList extends Component {

	render() {
		const { categories } = this.props
		return (
			<div> 
				<h3>Choose a Category</h3>
				<ul>
	          		{categories.map((category) => (
	            		<li key={category.name}>{category.name}</li>
	          		))}
	        	</ul>
        	</div>
		)
	}
}

export default CategoryList