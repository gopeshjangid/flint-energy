

const CreateFeed = (data)=>{

let items = ``;


  for (let i = 0;i<data.length;i++){
     let post = data[i];
     let slug = process.env.host_url+"/"+post.topic+"/"+post.category+"/"+post.slug;
    let updatedDate = post.updated_at ? new Date(post.updated_at).toUTCString() : '';
   items +=  ` 
      <item>
      <title>${post.title}</title>
      <link>${slug}</link>
      <guid isPermaLink="false">${post._id}</guid>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
        <description>description data</description>
      <content:encoded>
       <![CDATA[
           <!doctype html>
           <html lang="en" prefix="op: http://media.facebook.com/op#">
         <head>
           <meta charset="utf-8">
           <link rel="canonical" href="${slug}">
           <meta property="op:markup_version" content="v1.0">
         </head>
         <body>
           <article>
             <header>
                 <figure>
                     <img src="${post.images}" alt="${post.title}">
                     <figcaption>${post.title}</figcaption>
                 </figure>
                 <time class="op-published" dateTime="${new Date(post.created_at).toUTCString()}">${new Date(post.created_at).toUTCString()}</time>
                 <time class="op-modified" dateTime="${updatedDate}">${updatedDate}</time>
             </header>
              ${post.data}
               <footer>
                   <aside>Written by Thepostviews</aside>
                   <small>Copyright - Thepostviews</small>
             </footer>
           </article>
         </body>
       </html>
   ]]>
   </content:encoded>

 </item>
            `;

  }

  return items;

}


export default CreateFeed;