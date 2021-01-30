import axios from  "axios";
let url = process.env.host_url;

export const  GetRelatedPosts = async (slug,category ,config)=>{
  let pg_config = {skip : 0 ,limit :5};
  if(config){
    pg_config = config;
  }
  try {
      let data = [];
      let created = await axios.post(url+'/api/post?type=getRelatedPosts' ,{slug :slug ,category :category  ,...pg_config});
      if(created && created.data.success && created.data.data){
       data = created.data.data;
      }
      return data;
  } catch (err){
     console.log("error on fetching related posts" ,err.message);
  }
  
}

export let  GetTopPosts = async (query)=>{
 
  try {
      let data = [];
      let body = {slug : query.indexOf(1) !=-1 ?  query[1] : null ,category : query[0]};
      let created = await axios.post(url+'/api/post?type=getTrendingPosts' ,body);
      if(created && created.data.success && created.data.data){
       data = created.data.data;
      }
      return data;
  } catch (err){
     console.log("error on fetching top posts" ,err.message);
  }
  
}

export let  GetTopTopicPosts = async (topic)=>{
 
  try {
      let data = [];
      let created = await axios.post(url+'/api/post?type=getTopicTrendingPosts' ,{topic :topic});
      if(created && created.data.success && created.data.data){
        data = created.data.data;
      }
      return data;
  } catch (err){
     console.log("error on fetching top posts" ,err.message);
  }
  
}


export let  AutoSave = async (data)=>{
 
  try {
      let created = await axios.post(url+'/api/post?type=saveContent' ,data);
      return created.data;
  } catch (err){
     console.log("error on fetching top posts" ,err.message);
  }
  
}

export let  createDraft = async (id)=>{
 
  try {
      let data = [];
      let created = await axios.post(url+'/api/post?type=createDraft' ,{user_id :id});
      return created.data;
  } catch (err){
     console.log("error on fetching top posts" ,err.message);
  }
  
}

export let  deleteDraft = async (id)=>{
 
  try {
      let data = [];
      let created = await axios.post(url+'/api/post?type=deleteDraft' ,{id :id});
      return created.data;
  } catch (err){
     console.log("error on fetching top posts" ,err.message);
  }
  
}

