import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { convertTimestamp } from '../utils/helpers'


class PostList extends Component {

    renderPostList(posts) {

        const notDeleted = posts.filter(post => !post.deleted )

        return (
            notDeleted.map((post) => (
                <li key={post.id} className="collection-item">
                    <Link to={`/posts/${post.id}`}>
                        {post.title} - {convertTimestamp(post.timestamp)} ({post.voteScore})
                    </Link>
                </li>
            ))
        )
    }

    render() {
    	const { posts } = this.props

        if (!posts) {
            return <div>Loading...</div>
        }
        
    	return (
            <div>
                <h3>Posts</h3>
        		<ul className="collection">
                    {this.renderPostList(posts)}
            	</ul>

                <Link to="/posts/new"><button className="btn waves-effect waves-light">Create New Post</button></Link>
            </div>
       )
    }
}

function matchStateToProps({ posts }) {
    return { posts }
}

export default connect(matchStateToProps, null)(PostList)