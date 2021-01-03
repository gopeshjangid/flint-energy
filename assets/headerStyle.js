

const headerStyle = {
  borderColor : '#bedeeb',
  hoverLink : {
    color : 'white',
    background : '#226c82'
  },
  linkText :{
    color : '#226c82',
    fontWeight : '500',
    fontSize :'14px',
    textDecoration : 'none',
   

  },
  topBar: {
    display : "flex",
    flexDirection : "row",
    flexWrap:'nowrap',
    flex :1,
    justifyContent : 'space-between',
    borderRadius: "3px",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#fff",
    width: "100%",
    backgroundColor: "#fff",
    height :"40px",
    top:"0px",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    position: "relative",
    zIndex: "unset"
  },
  logo: {
    height :"28px",
    width :"80%",
    paddingTop : "9px",
    paddingLeft : '3px'
  },
  bottomBar: {
    overflowX : 'auto',
    background : '#fff' ,
    bottom: '14px',
    minHeight : '38px'

  },
};

export default headerStyle;
