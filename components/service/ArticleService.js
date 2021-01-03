import API from  "./request";
const BASE_URI = "https://graph.facebook.com/v8.0" ;

 const  PostArticle = async (data)=>{
   data.published = true;
   data.development_mode = process.env.isDevFb;
   let URI = `${process.env.pageId}/instant_articles`;
   let url = `${BASE_URI}/${URI}`;
   return API.POST(url, data); 
 }

 const  GetArticle = async (token,url)=>{
   let URI = `?id=${url}&fields=instant_article&access_token=${token}`;
  let ap_url = `${BASE_URI}${URI}`;
  return API.GET(ap_url); 
}

const  GetArticleDetail = async (token,id)=>{
  let URI = `/${id}&access_token=${token}`;
 let url = `${BASE_URI}${URI}`;
 return API.GET(url); 
}

const  GetAllArticles = async (token)=>{
  let URI = `${process.env.pageId}/instant_articles?access_token=${token}&development_mode=${process.env.isDevFb}`;
 let url = `${BASE_URI}/${URI}`;
 return API.GET(url); 
}


const  GetLongLivedToken = async (token)=>{
  let URI = `oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APPID}&client_secret=${process.env.APP_SECRET}&
  fb_exchange_token=${token}`;
  let url = `${BASE_URI}/${URI}`;
  return API.GET(url); 
}

const  GetPageToken = async (token)=>{
  let URI = `${process.env.pageId}?fields=access_token&access_token=${token}`;
  let url = `${BASE_URI}/${URI}`;
  return API.GET(url); 
}

export default  {PostArticle,
   GetArticle,
   GetAllArticles,
   GetArticleDetail,
   GetPageToken,
   GetLongLivedToken
  };

