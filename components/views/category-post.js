import React  from "react";
import {MDBCarousel, MDBCarouselInner, MDBCarouselItem ,  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBCardFooter } from "mdbreact";
import Link from "next/link";
const FeaturesPage = (props) => {
  
const sectionTitle = process.env.post_order;
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


const getPosts = (category ,key)=>{
   return(category.length>0 && <MDBCard
    className="my-1 px-1 mx-auto"
    style={{ fontWeight: 300, maxWidth: "100%" }}
    key={key}
  >
   <MDBCardBody style={{ paddingTop: 0 }}>
          <h1 className="h1-responsive font-weight-bold my-5 text-left">
             {getBadge(sectionTitle[key])}
          </h1>
        <MDBRow>
        
          {category.map((post ,postKey)=> {
            return <MDBCol key={postKey} className="main" md="6"  lg="6" xs="12" >
               <div key={postKey} style={{
                 borderBottom: "1px solid #e0e0e0",
                 marginBottom: "1.5rem"
                 
               }}>
                 <MDBRow >
                   <MDBCol md="3" >
                     <MDBView hover zoom rounded className="z-depth-1-half mb-4 img-view-sm">
                       <img
                         className="img-fluid"
                         src={post.images.length>0 && post.images[0]}
                         alt=""
                       />
                        <Link href={ "/"+props.getSlug(post.title)+"&"+post._id } ><a><MDBMask overlay="white-slight" className="waves-light" /></a></Link>
                      
                     </MDBView>
                   </MDBCol>
                   <MDBCol md="9" >
                     <div className="d-flex justify-content-between">
                       <MDBCol size="11" className="text-truncate pl-0 mb-3">
                       <Link href={ "/"+props.getSlug(post.title)+"&"+post._id }><a className="dark-grey-text light-blue-text font-weight-bold">{post.title}</a></Link>
                        
                       </MDBCol>
                       <Link href={ "/"+props.getSlug(post.title)+"&"+post._id }><a className="dark-grey-text light-blue-text font-weight-bold">
                         <MDBIcon icon="angle-double-right" />
                       </a></Link>
                     </div>
                   </MDBCol>
                 </MDBRow>
               </div>
               </MDBCol>
                 } )}
                 
                 </MDBRow>
                
        </MDBCardBody>
        <MDBCardFooter>
           <MDBRow>
             <MDBCol size="12" style={{textAlign : "right"}}><Link href={{ pathname: "/", query: {category : [sectionTitle[key]]} }}><a className="dark-grey-text light-blue-text font-weight-bold">
                         Read More..&nbsp;<MDBIcon icon="angle-double-right" />
                       </a></Link>
                       </MDBCol></MDBRow></MDBCardFooter>
         </MDBCard>);
}

  const getImages = (image)=>{
      return(<MDBCarousel activeItem={1} length={image.length} showControls={true} showIndicators={false} className="z-depth-1">
      <MDBCarouselInner>
       { image.map((img,key)=>
            <MDBCarouselItem itemId={key+1}>
              <MDBView hover  zoom>
                <img style={{maxHeight : '100px' ,minHeight : "80%"}}  className="d-block w-100" src={img} alt="First slide" />
              </MDBView>
            </MDBCarouselItem>
       )}
        </MDBCarouselInner></MDBCarousel>);
  }

  return (
    <div className="category-post my-2 mt-0">
      { props.CategoryPost.length>0 && props.CategoryPost.map((cat ,key)=>{
          return getPosts(cat ,key)
      })
     }
      </div> 
  );
}

export default FeaturesPage;