import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

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

	handleFormSubmit(values) {
		console.log(values)
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
					 <button type="submit" className="btn waves-effect waves-light">
						Save Post
  					</button>
				</form>
			</div>
		)
	}
}


export default reduxForm({
	form: 'NewPostForm'
})(
	connect(null, null)(NewPost)
)
