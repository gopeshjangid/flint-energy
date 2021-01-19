import React, { Component } from 'react'
import Navigation from '../home/navigation';
import JsonData from '../home/data/data.json';
export class App extends Component {
  state = {
    landingPageData: {},
  }
  getlandingPageData() {
    this.setState({landingPageData : JsonData})
  }

  componentDidMount() {
    this.getlandingPageData();
  }

  render() {
    return (
      <div>
        <Navigation />     
      </div>
    )
  }
}

export default App;
