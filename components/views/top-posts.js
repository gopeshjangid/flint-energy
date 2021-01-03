import React  from "react";
import {MDBCarousel, MDBCarouselInner, MDBCarouselItem ,  MDBRow, MDBCol, MDBIcon, MDBView } from "mdbreact";
import Link from  "next/link";
function TopPost  (props)  {
   let   posts = props.posts
   const newsStyle = {
    marginBottom: "1.5rem",
    paddingBottom : ".5rem"
  };

const getBadge = (type)=>{
  switch (type) {
    case "Current Affairs":
      return (<span data-test="badge" className="badge pink badge-pink"><i data-test="fa" aria-hidden="true" className="fa fa-globe pr-2"></i>World</span>);
      break;
    case "Lifestyle":
       return (<span data-test="badge" className="badge pink badge-pink"><i data-test="fa" aria-hidden="true" className="fa fa-globe pr-2"></i>Lifestyle</span>);
    break;
    case "Health":
      return (<span data-test="badge" className="badge pink badge-pink"><i data-test="fa" aria-hidden="true" className="fa fa-globe pr-2"></i>Health</span>);
    break;
    case "Bollywood":
      return (<span data-test="badge" className="badge pink badge-pink"><i data-test="fa" aria-hidden="true" className="fa fa-globe pr-2"></i>Bollywood</span>);
    break;
  
    default:
      break;
  }
}

  const getImages = (image)=>{
      return(
        image.length> 0 && 
              <MDBView hover  zoom>
                <img style={{maxHeight : '100px' ,minHeight : "80%"}}  className="d-block w-100" src={image[0]} alt="First slide" />
              </MDBView>
       
       );
  }

  return (
    <div className="top-post-box my-10 mt-5 px-5 mx-auto">
         <h1 className="h1-responsive font-weight-bold my-3 text-center">
            Top Stories
          </h1>
        <MDBRow>
        {posts.length>0 && posts.map((post ,key)=>
           <MDBCol size="12" md="6" sm="12" xs="12" key={key} >
            <MDBRow style={newsStyle}>
                
                  <MDBCol md="3" xs="3"size="3" >
                     {getImages(post.images)}
                     
                  </MDBCol>
                  <MDBCol md="9" xs="9" size ="9">
                  <div className="d-flex justify-content-between" >
                  <Link  href={"/"+props.getSlug(post.title)+"&"+ post._id } ><a  className="dark-grey-text light-blue-text font-weight-bold">
                        {getBadge(post.category)}
                        &nbsp;{post ? post.title : ""}&nbsp; <MDBIcon icon="angle-double-right" />
                        </a>
                  </Link>
                    </div>
                  </MDBCol>
                
               
            </MDBRow>
            </MDBCol>
         )}
         </MDBRow>
      </div> 
  );
}
 

export default TopPost;