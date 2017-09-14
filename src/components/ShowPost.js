import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { Field, reduxForm, initialize } from 'redux-form'

import { fetchPost,
	removePost,
	saveModifications,
	voteOnPost,
} from '../actions/PostActions'

import { 
	addComment,
	fetchComments,
	deleteComment,
	saveModifiedComment,
	voteOnComment,
	sortCommentsByCategory,
	sortCommentsByDirection
} from '../actions/CommentActions'

import { Link } from 'react-router-dom'
import { convertTimestamp } from '../utils/helpers'

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
	    modalOpen: false,
	    editModalOpen: false
  	}

	componentDidMount() {
		const { id } = this.props.match.params
		this.props.getPost(id)
		this.props.getComments(id)
	}

	onDelete() {
		const { id } = this.props.post

		this.props.deletePost(id, () => {
			this.props.history.push('/')
		})
	}

	onAddComment() {
		this.openModal()
	}

	onDeleteComment(comment) {
		const { id } = comment
		this.props.deleteComment(id)
	}

	onEditComment(comment) {
		const commentData = {
    		"body": comment.body,
    		"id": comment.id,
  		}

  		this.props.initialize(commentData)
		this.openEditModal()
	}

	onPostVoteScore(vote) {
		const { id } = this.props.post

		this.props.voteOnPost(vote, id, () => {
			this.props.history.push(`/posts/${id}`)
		})
	}

	onCommentVoteScore(vote, comment) {
		const { id } = comment
		this.props.voteOnComment(vote, id, () => {
			this.props.history.push(`/posts/${this.props.post.id}`)
		}) 
	}

	showPost(post) {
		return(
			<div>
				<Link to="/"><button className="btn waves-effect waves-light">Back to Main</button></Link>
				<h3>{post.title}</h3>
				<p>Category: {post.category}</p>
				<p>{post.body}</p>
				<p>Author: {post.author} - Created: {convertTimestamp(post.timestamp)}</p>
				<p>Vote Score: {post.voteScore}</p>
				<button onClick={() => this.onPostVoteScore("downVote")} className="btn waves-effect waves-light">-</button>
				<button onClick={() => this.onPostVoteScore("upVote")} className="btn waves-effect waves-light">+</button>

				<br></br>
				<br></br>

				<Link to={{ pathname: `/posts/${post.id}/edit`}}><button className="btn waves-effect waves-light">Edit Post</button></Link>
				<button onClick={this.onDelete.bind(this)} className="btn waves-effect waves-light">Delete Post</button>
				<button onClick={this.onAddComment.bind(this)} className="btn waves-effect waves-light">Add Comment</button>
			</div>
		)
	}

	showComments(comment) {
		return(
			<div key={comment.id}>
				<li className="list-group-item" key={comment.id}>
					<p>Text: {comment.body}</p>
					<p>Author: {comment.author} - Created: {convertTimestamp(comment.timestamp)}</p>
					<p>Votes: {comment.voteScore}</p>
					<button onClick={() => this.onCommentVoteScore("downVote", comment)} className="btn waves-effect waves-light">-</button>
					<button onClick={() => this.onCommentVoteScore("upVote", comment)} className="btn waves-effect waves-light">+</button>

					<br></br>
					<br></br>

					<button onClick={() => this.onEditComment(comment)} className="btn waves-effect waves-light">Edit</button>
					<button onClick={() => this.onDeleteComment(comment)} className="btn waves-effect waves-light">Delete</button>
				</li>
			</div>
		)
	}

	openModal = () => {
	    this.setState(() => ({
	      modalOpen: true
	    }))
	}

	openEditModal = () => {
	    this.setState(() => ({
	      editModalOpen: true
	    }))
	}

	closeModal = () => {
	    this.setState(() => ({
	      modalOpen: false
	    }))
	}

	closeEditModal = () => {
	    this.setState(() => ({
	      editModalOpen: false
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
		params.parentId = id

		this.props.addComment(params)
		this.closeModal()
	}

	handleEditFormSubmit(params) {
		const { id } = this.props.post
		params.parentId = id

		this.props.saveModifiedComment(params)
		this.closeEditModal()
	}

	render() {
		const { post, handleSubmit } = this.props
		const comments = this.props.comments.comments
		
		if (!post) {
			return <div>Loading post...</div>
		}

		return(
			<div>
				{this.showPost(post)}

				<p>Number of Comments: {comments.length}</p>
				<ul className="list-group">
				 	{ comments.map(comment => this.showComments(comment))}
				</ul>

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
							<button type="submit" className="btn btn-default">Save Comment</button>
						</form>
      					
		        		 <button
		        		 	className="btn btn-default"
                      		onClick={this.closeModal}>Cancel
                        </button>
		        	</div>
		         
		        </Modal>

		        <Modal
        		  overlayClassName='overlay'
		          isOpen={this.state.editModalOpen}
		          onRequestClose={this.closeEditModal}
		          contentLabel='Modal'
		          style={customStyles}
		        >
		        	<div className="modal-content">
		        		<h4>Edit Comment</h4>

		        		<form onSubmit={handleSubmit(this.handleEditFormSubmit.bind(this))}>
							<Field
								name="body"
								type="text"
								label="Your Comment"
								className="input-field"
								component={this.renderField}
							/>
							<button type="submit" className="btn btn-default">Save Comment</button>
						</form>
      					
		        		 <button
		        		 	className="btn btn-default"
                      		onClick={this.closeEditModal}>Cancel
                        </button>
		        	</div>
		         
		        </Modal>
		    </div>
		)
	}
}

function mapStateToProps({ post, comments }) {
	return { post, comments }
}

function mapDispatchToProps(dispatch) {
	return {
		getPost: (id) => dispatch(fetchPost(id)),
		deletePost: (id, callback) => dispatch(removePost(id, callback)),
		addComment: (comment) => dispatch(addComment(comment)),
		saveModifications: (params, callback) => dispatch(saveModifications(params, callback)),
		getComments: (id) => dispatch(fetchComments(id)),
		deleteComment: (id) => dispatch(deleteComment(id)),
		saveModifiedComment: (comment) => dispatch(saveModifiedComment(comment)),
		voteOnPost: (vote, id, callback) => dispatch(voteOnPost(vote, id, callback)),
		voteOnComment: (vote, id, callback) => dispatch(voteOnComment(vote, id, callback)),
		sortCommentsByCategory: (category) => dispatch(sortCommentsByCategory(category)),
        sortCommentsByDirection: (ascDesc) => dispatch(sortCommentsByDirection(ascDesc))
	}
}

export default reduxForm({
	form: 'EditPostForm'
})(
	connect(mapStateToProps, mapDispatchToProps)(ShowPost)
)
