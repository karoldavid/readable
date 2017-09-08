import React, { Component } from 'react'
import { Field, reduxForm, initialize } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveModifications } from '../actions'

class EditPost extends Component {

	componentDidMount() {
  		this.handleInitialize();
	}

	handleInitialize() {
	 	const postData = {
    		"title": this.props.post.title,
    		"category": this.props.post.category,
    		"body": this.props.post.body,
    		"author": this.props.post.author,
  		}

  		this.props.initialize(postData)
	}

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
		const { id } = this.props.post
		params.id = id
		this.props.saveModifications(params, () => {
			this.props.history.push('/')
		})
	}

	render() {

		const { post, handleSubmit } = this.props

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
					<button type="submit" className="btn waves-effect waves-light">Save Post</button>
  					<Link to={{ pathname: `/posts/${post.id}`}}><button className="btn waves-effect waves-light">Cancel</button></Link>
				</form>
  			</div>
		)
	}
}

function mapStateToProps( { post }) {
	return { post }
}

function mapDispatchToProps(dispatch) {
	return {
		saveModifications: (params, callback) => dispatch(saveModifications(params, callback))
	}
}

export default reduxForm({
	form: 'EditPostForm'
})(
	connect(mapStateToProps, mapDispatchToProps)(EditPost)
)
