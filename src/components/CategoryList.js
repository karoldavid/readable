import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class CategoryList extends Component {

	render() {
		const { categories } = this.props
		return (
			<div> 
				<h3>Choose a Category</h3>
				<ul>
	          		{categories.map((category) => (
	            		<li key={category.name}>
	            			<Link to={{ pathname: `/category/${category.name}`}}>{category.name}</Link>
	            		</li>
	          		))}
	        	</ul>
        	</div>
		)
	}
}

export default CategoryList