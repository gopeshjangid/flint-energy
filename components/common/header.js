import React, { Component } from 'react'
import Navigation from '../home/navigation';
import Header from '../home/header';
import Features from '../home/features';
import About from '../home/about';
import Services from '../home/services';
//import Gallery from '../home/gallery';
//import Testimonials from '../home/testimonials';
//import Team from '../home/Team';
import Portfolio from '../home/Portfolio'
import Contact from '../home/contact';
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
        <Portfolio data={JsonData.Portfolio} />
        <Features data={this.state.landingPageData.Features} />
        <About data={this.state.landingPageData.About} />
        <Services data={this.state.landingPageData.Services} />
        {/* <Testimonials data={this.state.landingPageData.Testimonials} /> */}
        {/* <Team data={this.state.landingPageData.Team} /> */}
        
        <Contact data={this.state.landingPageData.Contact} />
      </div>
    )
  }
}

export default App;
