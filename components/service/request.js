import axios from  "axios";

 const  GET =  (url,data)=>{
   let options = {};
    if(data){
      options = data;
    }
   return axios.get(url, options).then((res) => res).catch(e=>e); 
 }

 const  POST =  (url,data,config)=>{
  let options = {};
   if(config){
     options = config;
   }
  return axios.post(url,data, options).then((res) => res).catch(e=>e); 
}

export default  {POST,GET};

