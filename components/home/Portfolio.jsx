import React, { Component } from "react";
import Image from  "next/image";
import { withStyles  } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DescriptionIcon from '@material-ui/icons/Description';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CopyClipboard from  ".././copy-clipboard";
const useStyles = (theme)=>({
  introduction: {
    position :"relative",
    textAlign : 'center',
    title : {
      fontWeight: 600,
      fontSize : 20
    },
    heading: {
      fontSize:  theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  },
  list : {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  itemText : {
    display : 'inline-block'
  },
  inline: {
    display: 'inline',
  },
  projectName : {
    fontStyle: 'italic',
    textDecoration: 'underline',
    fontWeight: 600
  },
  'p ,h3, h6' : {
    fontSize :16,
    fontFamily : "Open Sans, sans-serif"
  },
  conenctLabel: {
    textAlign : "left",
    marginTop :'15px !important'
  },
  social: {
    fontSize : '15px !important'
  }
  
});
const Portfolio = (props)=> {
   const {classes}  = props;
   const [expanded, setExpanded] = React.useState(false);

   const handleChange = (panel) => (event, isExpanded) => {
     setExpanded(isExpanded ? panel : false);
   };
    return (
      <div id="aboutme" className="text-center">
        <div className="container">
          <div className="col-md-12 section-title"  style={{marginTop : "65px"}} >
          <Image width={1200} height ={700}  src="/images/portfolio/portfolio.jpg" />
          </div>
          <div id="row">
           <div className={classes.introduction}>
             <div className={classes.introduction.title}><h3>Hello, {' '} I am Gopesh Kumar Jangid</h3></div>
             <div className={classes.introduction.intro}><h5>{props.data.title}</h5></div>
             <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>PROGRAMMING LANUAGES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {props.data.skills.lang}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>DATABASES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {props.data.skills.db}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>CLOUD PLATEFORMS</Typography>
         
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {props.data.skills.cloud}
          </Typography>
        </AccordionDetails>
      </Accordion>
     <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>PAST PROJECTS</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List component="nav" className={classes.root} aria-label="mailbox folders">
            {props.data.skills.projects && props.data.skills.projects.map((project ,index)=>(
              <React.Fragment key={"items-"+index}> <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DescriptionIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={
                <Typography
                component="h3"
                variant="h5"
                className={classes.projectName}
                color="textPrimary"
              >{project.name+" - "+project.url}</Typography>} secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="subtitle1"
                className={classes.inline}
                color="textPrimary"
              >
                {project.type}
              </Typography>
              <Typography
                component= "span"
                variant="subtitle2"
                className={classes.inline}
                color="textPrimary"
              >
                {" - "+project.detail}
              </Typography>
            </React.Fragment>
          } />
               </ListItem>
            </React.Fragment>))}
            </List>
        </AccordionDetails>
           </Accordion>
           <Divider/>
           {' '}
           <Typography variant="h4" className={classes.conenctLabel}>
            Connect with me
          </Typography>
          <div className={classes.demo}>
            <List>
                <ListItem className={classes.social}>
                  <ListItemIcon>
                    <GitHubIcon />
                  </ListItemIcon>
                  <ListItemText
                   className={classes.social}
                    primary={props.data.githubUrl}
                  />
                  <CopyClipboard value={props.data.githubUrl} />
                </ListItem>
                <ListItem >
                  <ListItemIcon>
                    <LinkedInIcon />
                  </ListItemIcon>
                  <ListItemText
                   className={classes.social}
                    primary={props.data.linkedinUrl}
                  />
                  <CopyClipboard value={props.data.linkedinUrl}/>
                </ListItem>,
            </List>
          </div>
           </div>
          </div>
        </div>
      </div>
    );
}

export default withStyles(useStyles)(Portfolio);
