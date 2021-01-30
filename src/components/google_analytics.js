import React  from 'react';
const accountId = process.env.gaId;

export default ()=> {
 
    let gtmUrl = `https://www.googletagmanager.com/gtag/js?id=${accountId}`;
    return (<><script dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${accountId}', {
            page_path: window.location.pathname,
          });
            `,
        }}/>
        <script async src={gtmUrl}></script>
        </>);
       
}


