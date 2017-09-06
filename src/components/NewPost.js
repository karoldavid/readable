import React, {Component } from 'react'
import { Field, reduxForm, initialize } from 'redux-form'
import { connect } from 'react-redux'

class NewPost extends Component {



	render() {
		return(
			<div>
				<form>
					<Field name="title" type="text" component={renderField} label="title"/>
				</form>
			</div>
		)
	}
}

const form = reduxForm({
	form: NewPost
})

const renderField = field => (
    <div>
      <label>{field.input.label}</label>
      <input {...field.input}/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

export default connect(null, null)(form(NewPost));