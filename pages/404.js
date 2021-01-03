import React from 'react';
import Link from 'next/link';
import Header from '../components/views/partials/header'
import Footer from '../components/views/partials/footer';
class Notfound extends React.Component {

  constructor(props){
    super(props);
    this.state = {
              meta : process.env.meta
        }

  }

  render() {
    return (
        <>
        <Header meta={this.state.meta} />
        
        </>
    );
  }
}

export default Notfound;
