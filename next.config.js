
// dbConnect();
const withCss = require('@zeit/next-css')
const withImages = require('next-images');
const withPurgeCss = require('next-purgecss')
module.exports = withCss(withPurgeCss({
    purgeCssPaths: [
        'pages/**/*',
        '/static/css/*',
      ],
    purgeCssEnabled: ({ dev, isServer }) => (!dev && !isServer) 
  }));
module.exports = {
  withImages: withImages({
    fileExtensions: ["jpg", "jpeg", "png", "gif"],
    webpack(config, options) {
      return config
    }
  }),
  poweredByHeader: false,
    env: {
      APPID : process.env.NODE_ENV === 'production' ? '2774367772776641' : '786272788876213',
      APP_SECRET : process.env.NODE_ENV === 'production' ? '932f106a4cdb542a5985c1914d79ab25' : '46be689d119936303a8421c6a92a6c3e',
      pageId : '107684154307267',
      isDevFb : true,
        gaId :  process.env.NODE_ENV === 'production' ?  'UA-171669550-1': '',
        MONGO_URI: "mongodb://13.235.80.155:27001/webdoctool",
        API_URI : "https://onkhata.com/upload",
        API_URL : "https://onkhata.com",
        post_order :  ["Current Affairs","Health" ,"Lifestyle" ,"Bollywood" ,"Other" ],
        //host_url : "http://localhost:3000",
        category : [
            {id : 2 ,name : "Technology" ,
            description: "Explore- Learn Technologies ?, Programming language, Coding Concepts with practical examples, explore cloud plateforms services with proper explaination. how to learn programming? you can learn with latest tutotials.", 
            path : "technology",sub:[
            {id :7 ,name : "Home" ,path : "technology" , description: "Learn programming concepts, Javascript, reactjs, nextjs, databases, aws services, google clouds"},
            {id :1 ,name : "Tutorials" ,path : "tutotials" ,description: "webdoctool- Tutotials on programming languages, coding , databases, cloud plateforms services. Learn topicwise with good examples"},
            {id :3 ,name : "Javascript",path : "javascript" ,description: "Learn - Javascript, vanilla javascript, core concepts with examples, learn prototype inheritance and ES6 features. You can explore javascript modules, usages and when to use in your real application code."},
            {id :2 ,name : "ReactJs" ,path : "react" ,description: "Learn - reactjs , Latest features of reactjs, hooks, HOC, optimizations approaches. You will learn every concept with proper example. learn reacjs application performance speed up tips, methods. Learn serverside rendering in reactjs , redux management. explore server side framework in reactjs- Nextjs"},
            {id :4 ,name : "NodeJs",path : "nodejs" ,description: "Learn -  Nodejs core features , async and non blocking concepts. get explained about event loop and different streaming with examples. learn about nodejs middlewares applications and how to make middleware, learn expressjs framework and other framework of nodejs "},
            {id :5 ,name : "Blogging",path : "blogging", description : " Learn -  Bloggging, how to create a blogging website in wordpress, js. how to design, how to do digital marketing of blog website ? how to choose a niche for you blog website."},
            {id :6 ,name : "Cloud PlateForms",path : "cloud-technologies", description: " learn - cloud plateforms services, with live examples. problem solutions. server optimization. how to start get started with cloud plateforms? how to choose cloud plateforms ?"}
          ]} ,
          {id : 3 ,name : "Health & LifeStyle" , description: "Explore- Health updates, know about natural remedies. natural health tips, get health updates from worldwide. explore home remedies for hair, skin, and disease. meditation and yoga tips to become healthy. ",
           path : "health",sub:[
            {id :3 ,name : "Home" ,path : "health" ,description: "Explore- Health updates, know about natural remedies. natural health tips, get health updates from worldwide. explore home remedies for hair, skin, and disease. meditation and yoga tips to become healthy. "},
            {id :1 ,name : "LifeStyle" ,path : "lifestyle" ,description: "Explore - Lifestyle , personal care tips, how to choose good products for personal care? get the tips for good lifestyle about beauty products and grooming tips. how to use beauty products all information about beauty and products for personal care."},
            {id :2 ,name : "Skin - Hair" ,path : "skin-hair" ,description: " Know- about hair and skin problems, how to prevent hair fall naturally, how to treat hair fall by home remedies. how to make our skin glow naturally? To get all information about ayurveda, natural medicines."},
            {id :3 ,name : "Health Specialists",path : "health-specialists" ,description: ""},
            {id :4 ,name : "Eye Caring Tips",path : "eyes-ear-care", description: ""},
            {id :7 ,name : "Beauty Tips",path : "beauty-tips",description: " Beauty tips , natural beauty tips for glowing skin. beauty tips about your hair and looks. get all information about your beauty for girl, women. know tips about self grooming."},
            {id :5 ,name : "Health knowledge",path : "health-knowledge",description : "health knowledge , everything about your health, know everything about your medicine, how to choose from alopathy , ayurveda, homeopathy."},
            {id :9 ,name : "Meditation & Yoga",path : "meditation-yoga",description: " Meditation yoga , how to start meditation daily? , get all meditation tips from experts ? what are the benefits of yoga for health ? get all information about meditation and yoga."},
          ]} ,
          //{id : 6 ,name : "Trending" ,path : "trending"}
          {id : 10 , name  : "Business" ,path : "business" , description: "" , sub : [
            {id : 1 ,name : "Home" ,path : "business",description: "" },
            {id : 2 ,name : "Ecommerce" ,description: "" ,path : "ecommerce"},
            {id : 3 ,name : "Marketing & Advertisement" ,description: "" ,path : "marketing-advertisement"},
            {id : 3 ,name : "GST Bills" ,path : "gst-bills",description: "" },
          ]},
          {id : 7 , name  : "Knowledge and Facts",description: "" ,path : "news-media",sub: [
            {id:1 , name : "Home" ,path : "news-media",description: "" },
            {id:1 , name : "India Facts" ,path : "india",description: ""},
            {id:1 , name : "World Facts" ,path : "world",description: ""},
            {id:1 , name : "Bollywood" ,path : "bollywood",description: ""},
            {id:1 , name : "Sport" ,path : "sport",description: ""}
          ]},
        //{id : 6,path : "health" , name : "Health&Lifestyle"},{id : 7,path : "videos" , name : "Videos"}
       ],
        host_url : process.env.NODE_ENV === 'production' ?  "https://webdoctool.com" : "http://localhost:3000",
        meta : {
            title : "The Postviews - Publish content on different topics on Database, Cloud plateforms, Health, Education, Social Media, Trending, Lifestyle, News Media",
            description : "Publish you content on Blogging, Health, Education, Technology, Programming, Personal Care, New Media. Share ideas on various topics.",
            keywords : "Health , Education , Technology , Knowledge , Facts , Programming , Life Style , blogging , hairs , skin , fitness , javascript , reactjs , database , nodejs , web development , motivation",
            url : "https://webdoctool.com",
            image : "/logo.png",
            canonical : "https://webdoctool.com",
            site_name : "webdoctool"
          }
    },
    
}
