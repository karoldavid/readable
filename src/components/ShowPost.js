import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { Field, reduxForm } from 'redux-form'
import { fetchPost, removePost, addComment } from '../actions'
import { Link } from 'react-router-dom'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

class ShowPost extends Component {

	state = {
	    modalOpen: false
  	}

	componentDidMount() {
		const { id } = this.props.match.params
		this.props.getPost(id)
	}

	onDelete() {
		const { id } = this.props.post
		console.log(id)
		this.props.deletePost(id, () => {
			this.props.history.push('/')
		})
	}

	onAddComment() {
		this.openModal()
	}

	showPost(post) {
		return(
			<div>
				<h3>{post.title}</h3>
				<p>{post.category} {post.author} {post.voteScore}</p>
				<p>{post.body}</p>
				<Link to="/"><button className="btn waves-effect waves-light">Back to Main</button></Link>
				<Link to={{ pathname: `/posts/${post.id}/edit`}}><button className="btn waves-effect waves-light">Edit Post</button></Link>
				<button onClick={this.onDelete.bind(this)} className="btn waves-effect waves-light">Delete Post</button>
				<button onClick={this.onAddComment.bind(this)} className="btn waves-effect waves-light">Add Comment</button>
			</div>
		)
	}

	openModal = () => {
	    this.setState(() => ({
	      modalOpen: true
	    }))
	}

	closeModal = () => {
	    this.setState(() => ({
	      modalOpen: false
	    }))
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

		params.postId = id

		this.props.addComment(params)

		this.closeModal()
	}

	render() {
		const { post, handleSubmit } = this.props

		if (!post) {
			return <div>Loading post... </div>
		}

		return(
			<div>
				{ this.showPost(post) }
				
				<Modal
		          isOpen={this.state.modalOpen}
		          onRequestClose={this.closeModal}
		          contentLabel='Modal'
		          style={customStyles}
		        >
		        	<div className="modal-content">
		        		<h4>Add A Comment</h4>

		        		<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
							<Field
								name="body"
								type="text"
								label="Your Comment"
								className="input-field"
								component={this.renderField}
							/>
							<Field
								name="author"
								type="text"
								label="Your Name"
								className="input-field"
								component={this.renderField}
							/>
							<button type="submit" className="btn waves-effect waves-light">Save Comment</button>
						</form>
      					
		        		 <button
		        		 	className="btn waves-effect waves-light"
                      		onClick={this.closeModal}>Cancel
                        </button>
		        	</div>
		         
		        </Modal>
		    </div>
		)
	}
}

function mapStateToProps({ post }) {
	return { post }
}

function mapDispatchToProps(dispatch) {
	return {
		getPost: (id) => dispatch(fetchPost(id)),
		deletePost: (id, callback) => dispatch(removePost(id, callback)),
		addComment: (comment) => dispatch(addComment(comment))
	}
}

export default reduxForm({
	form: 'EditPostForm'
})(
	connect(mapStateToProps, mapDispatchToProps)(ShowPost)
)
