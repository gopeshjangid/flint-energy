import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from './table';
import CONSTANTS from './constants';
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: '100%',
  
  },
  container: {
    maxHeight: 440,
    height : '100vh'
  },
});
export default  React.memo(function StickyHeadTable(props) {
  const classes = useStyles();
  let type = props.type;
  const [rows ,setRow] = React.useState([]);
  let columns  = CONSTANTS.columns[type];
   let title = (type=="users") ? "Users List" : (type=="category" ? "Category List" : "Topics List");
    let  editable = {
        onRowAdd: (newData) =>{
            return new Promise(async (resolve)=>{
                let res = await axios.post(CONSTANTS.API.manageDashboardActions+"?type="+type+"&action=add",newData)
                resolve();
                setRow((prevState) => {
                  const data = [...prevState];
                  data.push(newData);
                  return { ...prevState, data };
                });
                resolve();
            }) 
        } ,
        onRowUpdate:  (newData, oldData) =>{
          return new Promise(async (resolve)=>{
            let res = await axios.post(CONSTANTS.API.manageDashboardActions+"?type="+type+"&action=update",newData)
            resolve();
            if (oldData) {
              setRow((prevState) => {
                const data = [...prevState];
                // console.log("fetched rows" ,data)
                // console.log("fetched index" ,data.indexOf(oldData))
                 data[data.indexOf(oldData)] = newData;
                return [ ...data ];
              });
            }
            
        })
        },
        onRowDelete: (oldData) =>{
          //onDelete(oldData)
        },
      };
    
  React.useEffect(()=>{

   const getData =async ()=>{
      let  user = JSON.parse(localStorage.getItem("user")) ;
      if(user){
        let url = CONSTANTS.API.manageDashboard+"?type="+type;
        let created = await axios.get(url);
        if(created && created.data.success && created.data.data){
          setRow(created.data.data);
        }
      }
    }
      
   getData();
      return()=>{

      };
  },[type]);
  
  return (
    <Paper className={classes.root}>
      {<Table columns={columns} rows={rows} title={title} editable={editable} /> }
    </Paper>
  );
})
