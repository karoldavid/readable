import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { fetchCategories } from '../actions/CategoryActions'
import { fetchPosts } from '../actions/PostActions'

import CategoryList from './CategoryList'
import PostList from './PostList' 
import Category from './Category'
import ShowPost from './ShowPost'
import NewPost from './NewPost'
import EditPost from './EditPost'
import NoMatch from './NoMatch'

class App extends Component {
  componentDidMount() {
    this.props.getAllCategories();
    this.props.getAllPosts();
  }

  render() {
    return (
      <div className="app">

        <Switch>
          <Route path="/posts/new" component={NewPost}/>
          <Route path="/posts/:id/edit" component={EditPost}/>
          <Route path="/posts/:id" component={ShowPost}/>
          <Route path="/:cat/:id" component={ShowPost}/>
          <Route path="/:cat" component={Category}/>
          <Route exact path="/" render={() => (
            <div>
              <CategoryList/>
              <PostList/>
            </div>
          )}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return { categories, posts }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchPosts())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))