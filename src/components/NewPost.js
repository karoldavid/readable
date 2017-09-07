import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { savePost } from '../actions'
import { Link } from 'react-router-dom'

class NewPost extends Component {

	renderField(field) {
		return (
	    	<div>
	      		<label>{field.input.label}</label>
	      		<input {...field.input}/>
	      		{field.touched && field.error && <div className="error">{field.error}</div>}
	    	</div>
	    )
	}

	handleFormSubmit(params) {
		this.props.savePost(params)
	}

	render() {

		const { handleSubmit } = this.props

		return(
			<div>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<Field
						name="title"
						type="text"
						label="Post Title"
						className="input-field"
						component={this.renderField}
					/>
					<Field
						name="category"
						type="text"
						label="Post Category"
						className="input-field"
						component={this.renderField}
					/>
					<Field
						name="body"
						type="text"
						label="Post Content"
						className="input-field"
						component={this.renderField}
					/>
					<Field
						name="author"
						type="text"
						label="Author Name"
						className="input-field"
						component={this.renderField}
					/>
					 <button type="submit" className="btn waves-effect waves-light">
						Save Post
  					</button>
  					<Link to="/"><button className="btn waves-effect waves-light">Cancel</button></Link>
				</form>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		savePost: (params) => dispatch(savePost(params))
	}
}

export default reduxForm({
	form: 'NewPostForm'
})(
	connect(null, mapDispatchToProps)(NewPost)
)
