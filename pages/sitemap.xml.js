import React from 'react';
import {generateSiteMap} from  "./api/sitemap";


class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    let sitemap  = await generateSiteMap();
    res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);
    res.end();
  }

}

export default Sitemap;
