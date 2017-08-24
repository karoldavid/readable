import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import * as ReadableAPI from '../utils/ReadableAPI'
import CategoryList from './CategoryList'
import PostList from './PostList' 
import NoMatch from './NoMatch'

class App extends Component {
  state = {
    categories: [],
    posts: [],
  }

  componentDidMount() {
    ReadableAPI.getAllCategories().then((categories) => {
      this.setState({ categories: categories })
    })
    ReadableAPI.getAllPosts().then((posts) => {
      console.log(posts);
      this.setState({ posts: posts })
    })
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

export default App