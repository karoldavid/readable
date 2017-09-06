import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { fetchCategories } from '../actions'
import { fetchPosts } from '../actions'

import CategoryList from './CategoryList'
import PostList from './PostList' 
import Category from './Category'
import ShowPost from './ShowPost'
import NewPost from './NewPost'
import NoMatch from './NoMatch'

class App extends Component {
  componentDidMount() {
    this.props.fetch();
    this.props.getAllPosts();
  }

  render() {
    return (
      <div className="app">

        <Switch>
          <Route path="/category/:cat" component={Category}/>
          <Route path="/posts/new" component={NewPost}/>
          <Route path="/posts/:id" component={ShowPost}/>
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
    fetch: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchPosts())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))