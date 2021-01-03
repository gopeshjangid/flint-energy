import React from 'react';
import { MDBContainer } from 'mdbreact';
import TopPost from  "./top-posts.js";
import CategoryPost from  "./category-post.js";
import Blank from './blank'
const Home = (props) => {
  const msg = "No post found !.";
  return (
    <MDBContainer fluid className="home-container">
      {props.topPost.length>0 ? <TopPost getSlug={props.getSlug} posts={props.topPost}/> : <Blank message={msg}/>} 
       {props.category_post.length > 0 && <CategoryPost getSlug={props.getSlug} CategoryPost ={props.category_post}/> }
    </MDBContainer>
  );
}

export default Home;
