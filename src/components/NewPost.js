import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { savePost } from '../actions'
import { Link } from 'react-router-dom'

class NewPost extends Component {

	renderField(field) {
		return (
	    	<div className="form-group">
	      		<label>{field.input.label}</label>
	      		<input className="form-control" {...field.input}/>
	      		{field.touched && field.error && <div className="error">{field.error}</div>}
	    	</div>
	    )
	}

	renderDrowpDownSelect() {
		return(
			<div>
				<h3>Choose a Category!"</h3>
				<select name="cars">
				  <option value="volvo">Volvo</option>
				  <option value="saab">Saab</option>
				  <option value="fiat">Fiat</option>
				  <option value="auda">Audi</option>
				</select>
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
			<div className="row">
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
					 <button type="submit" className="btn btn-default">
						Save Post
  					</button>
  					<Link to="/"><button className="btn btn-default">Cancel</button></Link>
				</form>

				{this.renderDrowpDownSelect()}
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
