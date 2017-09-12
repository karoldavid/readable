import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, ButtonToolbar, ToggleButtonGroup, ToggleButton, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import { convertTimestamp } from '../utils/helpers'
import { sortVoteScoreDown } from '../actions'


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

    onSortByChange(event) {
        console.log(event)
    }

    onSortDirectionChange(event) {
        console.log(event)
    }

    renderToolBar() {
        const postListOrderAscDesc = 'asc'

        return(
            <div>
                <ButtonToolbar>
                    <DropdownButton
                        title="Sort By"
                        id="bg-nested-dropdown"
                        onSelect={(event) => {
                          this.onSortByChange(event);
                        }}
                    >
                        <MenuItem eventKey="voteScore">Vote Score</MenuItem>
                        <MenuItem eventKey="timestamp">Post Date</MenuItem>
                    </DropdownButton>
                    <ToggleButtonGroup
                        type="radio"
                        name="postListSortAscDesc"
                        defaultValue={postListOrderAscDesc}
                        onChange={(event) => {
                            this.onSortDirectionChange(event);
                        }}
                      >
                      <ToggleButton value="asc">Ascending</ToggleButton>
                      <ToggleButton value="desc">Descending</ToggleButton>
                    </ToggleButtonGroup>
    
                </ButtonToolbar>
            </div>
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
        		<ul className="list-group">
                    {this.renderPostList(posts)}
            	</ul>

                {this.renderToolBar()}

                <Link to="/posts/new"><button className="btn waves-effect waves-light">Create New Post</button></Link>
            </div>
       )
    }
}

function matchStateToProps({ posts }) {
    return { posts }
}

function matchDispatchToProps(dispatch) {
    return {
        sortVoteScoreDown: (orderBy) => dispatch(sortVoteScoreDown(orderBy))
    }
} 

export default connect(matchStateToProps, matchDispatchToProps)(PostList)