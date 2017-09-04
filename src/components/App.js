import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { fetchCategories } from '../actions'
import { fetchPosts } from '../actions'

import CategoryList from './CategoryList'
import PostList from './PostList' 
import Category from './Category'
import ShowPost from './ShowPost'
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

          <Route path="/category/:catID" component={Category}/>
          <Route path="/posts/:id" component={ShowPost}/>
          <Route exact path="/" render={() => (
            <div>
              <CategoryList categories={this.props.categories}/>
              <PostList posts={this.props.posts}/>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)