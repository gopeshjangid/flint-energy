import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import CategoryIcon from '@material-ui/icons/Category';
import GroupIcon from '@material-ui/icons/Group';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ListAltIcon from '@material-ui/icons/ListAlt';
const GA_TRACKING_ID = process.env.gaId;
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export const optionsConfig = () => {
  
  let options = [
    {name : "Profile" ,path : {query : {page : "profile"} },icon :  <AccountBoxIcon/>},
    {name : "Manage Posts" ,path : {query : {page : "post"}} ,icon : <ListAltIcon/>},
    {name : "Manage Topic" ,path : {query : {page : "topic"}} ,icon : <ListIcon/>},
    {name : "Manage Category" ,path : {query : {page : "category"}} ,icon : <CategoryIcon/>},
    {name : "Manage Users" ,path : {query : {page : "users"}} ,icon : <GroupIcon/>},
    {name : "Setting" ,path : {query : {page : "setting"}} ,icon : <SettingsIcon/>}            
 ];

 return options;
}