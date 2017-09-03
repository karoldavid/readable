import React, { Component } from 'react'

class PostList extends Component {

    render() {
    	const { posts } = this.props
    	return (
            <div>
                <h3>Posts</h3>
        		<ul>
              		{posts.map((post) => (
                		<li key={post.title}>{post.title}</li>
                	))}
            	</ul>
            </div>
       )
    }
}

export default PostList