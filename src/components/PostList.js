import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, ButtonToolbar, ToggleButtonGroup, ToggleButton, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import { convertTimestamp } from '../utils/helpers'
import { sortPostsByDirection, sortPostsByCategory } from '../actions'


class PostList extends Component {

    renderPostList(posts) {

        const notDeleted = posts.filter(post => !post.deleted )

        return (
            notDeleted.map((post) => (
                <li key={post.id} className="list-group-item">
                    <Link to={`/posts/${post.id}`}>
                        {post.title} - {convertTimestamp(post.timestamp)} ({post.voteScore})
                    </Link>
                </li>
            ))
        )
    }

    onSortByPropertyChange(event) {
        this.props.sortPostsByCategory(event)
    }

    onSortDirectionChange(event) {
        this.props.sortPostsByDirection(event)
    }

    renderPostListToolBar() {
        const postListOrder = 'asc'
        const postListSortProperty = 'voteScore'

        return(
            <div>
                <ButtonToolbar>
                    <DropdownButton
                        title="Sort By"
                        defaultValue={postListSortProperty}
                        id="post-list-category-order"
                        onSelect={(event) => {
                          this.onSortByPropertyChange(event);
                        }}
                    >
                        <MenuItem eventKey="voteScore">Vote Score</MenuItem>
                        <MenuItem eventKey="timestamp">Post Date</MenuItem>
                    </DropdownButton>
                    <ToggleButtonGroup
                        type="radio"
                        name="postListOrder"
                        defaultValue={postListOrder}
                        onChange={(event) => {
                            this.onSortDirectionChange(event);
                        }}
                      >
                      <ToggleButton value="asc">Ascending</ToggleButton>
                      <ToggleButton value="desc">Descending</ToggleButton>
                    </ToggleButtonGroup>
                     <Link to="/posts/new"><Button className="btn waves-effect waves-light">Create New Post</Button></Link>
                </ButtonToolbar>
            </div>
        )
    }

    render() {
    	const { posts } = this.props.posts

        console.log(this.props)

    	return (
            <div>
                <h3>Posts</h3>
        		<ul className="list-group">
                    {this.renderPostList(posts)}
            	</ul>

                {this.renderPostListToolBar()}

            </div>
       )
    }
}

function matchStateToProps({ posts }) {
    return { posts }
}

function matchDispatchToProps(dispatch) {
    return {
        sortPostsByCategory: (category) => dispatch(sortPostsByCategory(category)),
        sortPostsByDirection: (ascDesc) => dispatch(sortPostsByDirection(ascDesc))
    }
} 

export default connect(matchStateToProps, matchDispatchToProps)(PostList)