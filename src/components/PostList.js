import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class PostList extends Component {

    renderPostList(posts) {
        return (
            posts.map((post) => (
                <li key={post.title} className="collection-item">
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
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