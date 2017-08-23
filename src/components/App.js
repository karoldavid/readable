import React, { Component } from 'react'
import * as ReadableAPI from '../utils/ReadableAPI'
import CategoryList from './CategoryList'

class App extends React.Component {
  state = {
    categories: []
  }

  componentDidMount() {
    ReadableAPI.getAllCategories().then((categories) => {
      this.setState({ categories: categories })
    })
  }

  render() {
    return (
      <div className="app">
        <CategoryList categories={this.state.categories}/>
      </div>
    )
  }
}

export default App