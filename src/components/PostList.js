import React, { Component } from 'react'

class PostList extends Component {

    render() {

    	const { posts } = this.props

    	return (
    		<ul>
          		{posts.map((post) => (
            		<li key={post.title}>{post.title}</li>
            	))}
        	</ul>
       )
    }
}

export default PostList