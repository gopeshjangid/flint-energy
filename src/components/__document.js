import React  from "react";
import Head from "next/head";
const Meta = (props)=>{

   return(<Head><meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
   <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
   <meta httpEquiv="content-language" content="en-us"/>
   <title>{props.meta.title }</title>
   <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
   <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
   <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
   <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
   <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
   <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
   <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
   <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
   <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
   <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
   <link rel="manifest" href="/manifest.json"/>
   <meta name="msapplication-TileColor" content="#ffffff"/>
   <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
   <meta name="theme-color" content="#ffffff"/>
   
   <meta name="description" content={props.meta.description} />
   <meta name="google-site-verification" content="google471ca55e3b38fdb1.html"/>
   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
   <meta name="keywords" content={props.meta.keywords ? props.meta.keywords : "World affairs ,Health Tips ,Precautions for health ,tips for lifestyle ,Hair ,Skin ,Muscles , Food ,Recipe ,How to ready dish , technology learning ,Bollywood ,actor ,actress , pictures , galleries" }/>
   <meta name="robots" content= "index, follow"/>
   <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"></meta>
   <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
   <link rel="canonical" href={props.meta.canonical} />
   <meta name="og:type" content="article"/>
   <meta property="og:locale" content="en-uS"/>
   <meta name="description" content={props.meta.description}/>
   <meta name="og:title" content={props.meta.title}/>
   <meta name="og:site_name" content={props.meta.site_name}/>
   <meta name="og:keywords" content={props.meta.keywords}/>
   <meta name="og:url" content={props.meta.url}/>
   <meta name="og:description" content={props.meta.description}/>
   <meta name="og:image" content={props.meta.image}/>
   <meta property="og:image:height" content="200"/>
   <meta property="og:image:width" content="300"/>
   <meta property="twitter:card" content="summary_large_image"/>
   <meta name="twitter:title" content={props.meta.title}/>
   <meta name="twitter:site_name" content={props.meta.site_name}/>
   <meta name="twitter:url" content={props.meta.url}/>
   <meta name="twitter:description" content={props.meta.description}/>
   <meta name="twitter:image" content={props.meta.image}/>
   <meta property="article:tag" content="interview-preparation"/>
   <meta property="article:section" content="Articles"/>
   <meta property="article:published_time" content={props.meta.created_at}/>
   <meta property="article:modified_time" content={props.meta.created_at}/></Head>);
}
 

export default Meta;