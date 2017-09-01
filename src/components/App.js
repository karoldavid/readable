import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { fetchCategories } from '../actions'
import { fetchPosts } from '../actions'
import CategoryList from './CategoryList'
import PostList from './PostList' 
import NoMatch from './NoMatch'

class App extends Component {
  componentDidMount() {
   // ReadableAPI.getAllCategories().then((categories) => {
      //this.setState({ categories: categories })
   // })
   // ReadableAPI.getAllPosts().then((posts) => {
   //   this.setState({ posts: posts })
   // })
    this.props.fetch();
    this.props.getAllPosts();
  }

  render() {
    return (
      <div className="app">

        <Switch>
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