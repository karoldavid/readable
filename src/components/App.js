import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { fetchCategories } from '../actions'
import CategoryList from './CategoryList'
import PostList from './PostList' 
import NoMatch from './NoMatch'

class App extends Component {
  state = {
    categories: [],
    posts: [],
  }

  componentDidMount() {
   // ReadableAPI.getAllCategories().then((categories) => {
      //this.setState({ categories: categories })
   // })
   // ReadableAPI.getAllPosts().then((posts) => {
   //   this.setState({ posts: posts })
   // })
    this.props.fetch();
  }

  render() {
    return (
      <div className="app">

        <Switch>
          <Route exact path="/" render={() => (
            <div>
              <CategoryList categories={this.state.categories}/>
              <PostList posts={this.state.posts}/>
            </div>
          )}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

function mapDispatchToProps (dispatch) {
  return {
    fetch: () => dispatch(fetchCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)