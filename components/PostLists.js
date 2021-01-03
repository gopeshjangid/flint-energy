import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from './table';
import axios from "axios";
import {useRouter} from "next/router";
import CONSTANTS from './constants';

const useStyles = makeStyles({
  root: {
    width: '100%',
  
  },
  container: {
    maxHeight: 440,
    height : '100vh'
  },
});
export default  React.memo(function StickyHeadTable() {
  const classes = useStyles();
  const router = useRouter();
  const [rows ,setRow] = React.useState([]);
  const columns = CONSTANTS.columns.posts;
  let actions = [
    {
      icon: 'Edit',
      tooltip: 'Edit Post',
      onClick: (event, rowData) => router.push("/create-post?post="+rowData._id)
    },
    {
      icon: 'publish',
      tooltip: 'publish post',
      onClick: (event, rowData) => confirm("You want to delete " + rowData.name)
    }
  ];
  React.useEffect(()=>{

   const getData =async ()=>{
      let  user = JSON.parse(localStorage.getItem("user")) ;
      if(user){
        let url = CONSTANTS.API.getUserALLPosts+"?user_id="+user._id;
        let created = await axios.get(url);
        if(created && created.data.success && created.data.data){
          setRow(created.data.data);
        }
      }
    }
   getData();
      return()=>{

      };
  },[]);
 
  return (
    <Paper className={classes.root}>
      <Table actions={actions}  title="Posts List" columns={columns} rows={rows} />
    </Paper>
  );
})
