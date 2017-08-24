import React, { Component } from 'react'
import * as ReadableAPI from '../utils/ReadableAPI'
import CategoryList from './CategoryList'
import PostList from './PostList' 

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
        <CategoryList categories={this.state.categories}/>
        <PostList posts={this.state.posts}/>
      </div>
    )
  }
}

export default App