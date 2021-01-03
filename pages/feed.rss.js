import React from 'react';
import CreateFeed from  "../components/create-feed";
import axios from  "axios";
let url = process.env.host_url;

class RssFeed extends React.Component {
  static async getInitialProps({res}) {
    const response = await axios.get(url+'/api/post?type=getFeedList&start=0'); 
    let data = response.data.data;
    // const response2 = await axios.get(url+'/api/post?type=getFeedList', { params : {start :6},
    //   maxBodyLength: 100000,
    // }); 
    //let rs = response2.data ? response2.data.data : [];
    //data = data.concat(rs);
    let items = await  CreateFeed(data);

    let rss  =  `<?xml version="1.0" encoding="UTF-8"?>
                  <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
                    <channel>
                      <title>${process.env.meta.title}</title>
                      <description>${process.env.meta.description}</description>
                      <link>${url}</link>
                      <lastBuildDate>${new Date("10-10-2020").toUTCString()}</lastBuildDate>
                      <language>en-us</language>
                   `;

              rss += items;
              rss+= `</channel></rss>`;
              res.setHeader('Content-Type', 'application/xml');
              res.write(rss);
              res.end();
  }

}

export default RssFeed;
