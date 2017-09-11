import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CategoryList extends Component {

	renderCategoryList(categories) {
		return (
			categories.map((category) => (
				<li key={category.name} className="collection-item">
	            	<Link to={{ pathname: `/category/${category.name}`}}>
	            		{category.name}
	            	</Link>
	            </li>
	        ))
		)
	}

	render() {
		const { categories } = this.props

		return (
			<div> 
				<h3>Choose a Category</h3>
				<ul className="collection">
					{this.renderCategoryList(categories)}
	        	</ul>
        	</div>
		)
	}
}

function mapStateToProps({ categories }) {
	return { categories }
}

export default connect(mapStateToProps, null)(CategoryList)