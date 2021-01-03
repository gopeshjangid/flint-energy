import React from 'react';
import Dynamic from "next/dynamic";
import {useRouter} from "next/router";
import Layout  from  "../components/layout";
import Header from  "../components/home_header";
const headerLink = [{name : "Manage Posts" ,path: "manage-post" ,query : {page :'post'}},{name : "Write New Post" ,path: "create-post" ,query : {page :'create-post'}}];
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import {ScreenLoader}  from  "../components/views/custom";
const Profile =  Dynamic(()=>import("../components/profile"),{loading :()=><ScreenLoader open={true} /> ,ssr :false}) ;
const PostList =  Dynamic(()=>import("../components/PostLists"),{loading :()=><ScreenLoader  open={true} /> ,ssr :false}) ;
const Dashboard =  Dynamic(()=>import("../components/manageDashboard"),{loading :()=><ScreenLoader  open={true} /> ,ssr :false}) ;
import {optionsConfig} from  "../components/common";
const useStyles = makeStyles({
  root: {
    
  },
});


const ManagePost =()=> {
  let router  = useRouter();
  let pageName = router.query ? router.query.page : ""; 
  let options = optionsConfig();
  const classes = useStyles();
    let [isLoggedIn , setLogin]  = React.useState(false);
   
    React.useEffect(()=>{
      let user = typeof window !==undefined && JSON.parse(localStorage.getItem("user"));
      let isLoggedIn = user && user._id ? true : false;
      setLogin(isLoggedIn);
    },[]);

    const selectOption =(page)=>{
      router.push(page)
    }

    const leftSideBar =()=>{
      return options.map((option ,key)=> 
      <List key={key} component="nav" className={classes.root} aria-label="contacts">
      <ListItem selected={option.path.query.page==router.query.page} button alignItems="center" onClick={()=>selectOption(option.path)}>
        <ListItemIcon color="secondary">
          {option.icon}
        </ListItemIcon>
       {option.name}
      </ListItem>
    </List>);
    }

    const getContent = ()=>{
      let page  =router.query.page;
       switch (page) {
         case 'post':
           return <PostList />
           break;
          case 'users':
          case 'category':
          case 'topic':
           return <Dashboard {...router} type={page}/>
           break;
         default:
           return <Profile/>;
           break;
       }
    }
    return (
      <>
      <Header meta={process.env.meta} title="Manage Post - Add New , Update , Delete" headerLinks={headerLink} />
      <Layout pagename="manage"
          leftSideBar={isLoggedIn ? leftSideBar() : null}
          fullWidth={true}
          dashboard={true}
         >
        {isLoggedIn && getContent() }
      </Layout>
      </>
    );
  
} 

export default ManagePost ;
