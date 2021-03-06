import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, FormControl, FormGroup, ControlLabel, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { savePost } from '../actions/PostActions'

class NewPost extends Component {

	renderField(field) {
		return (
	    	<div className="form-group">
	      		<label>{field.input.label}</label>
	      		<input className="form-control" type="text" {...field.input}/>
	      		{field.touched && field.error && <div className="error">{field.error}</div>}
	    	</div>
	    )
	}

	handleFormSubmit(params) {
		this.props.savePost(params, () => {
			this.props.history.push('/')
		})
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
					 <button type="submit" className="btn btn-primary">
						Save Post
  					</button>
  					<Link to="/"><button className="btn btn-danger">Cancel</button></Link>
				</form>

			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		savePost: (params, callback) => dispatch(savePost(params, callback))
	}
}

export default reduxForm({
	form: 'NewPostForm'
})(
	connect(null, mapDispatchToProps)(NewPost)
)
