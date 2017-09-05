import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostList extends Component {

    render() {
    	const { posts } = this.props
    	return (
            <div>
                <h3>Posts</h3>
        		<ul>
              		{posts.map((post) => (
                		<li key={post.title}>
                            <Link to={{ pathname: `/posts/${post.id}`}}>{post.title}</Link>
                        </li>
                	))}
            	</ul>
            </div>
       )
    }
}

export default PostList