import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class PostList extends Component {

    render() {
    	const { posts } = this.props

        if (!posts) {
            return <div>Loading...</div>
        }
        
    	return (
            <div>
                <h3>Posts</h3>
        		<ul className="collection">
              		{posts.map((post) => (
                		<li key={post.title} className="collection-item">
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        </li>
                	))}
            	</ul>
            </div>
       )
    }
}

function matchStateToProps({ posts }) {
    return { posts }
}

export default connect(matchStateToProps, null)(PostList)