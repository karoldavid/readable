import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CategoryList extends Component {

	render() {
		const { categories } = this.props

		if (!categories) {
			return <div>Loading...</div>
		}

		return (
			<div> 
				<h3>Choose a Category</h3>
				<ul className="collection">
	          		{categories.map((category) => (
	            		<li key={category.name} className="collection-item">
	            			<Link to={{ pathname: `/category/${category.name}`}}>{category.name}</Link>
	            		</li>
	          		))}
	        	</ul>
        	</div>
		)
	}
}

function mapStateToProps({ categories }) {
	return { categories }
}

export default connect(mapStateToProps, null)(CategoryList)