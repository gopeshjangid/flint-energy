
import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  divider: {
    width : '100%',
    marginBottom : '20px',
    marginTop : '20px'
  },
  container : {
    marginTop : '30px',
    marginBottom : '30px',
  }

}));
 function about()  {
  const classes = useStyles();
    return (
      <>
        <div id="aboutus">
          <div className={classes.container}>
            <div className="col-md-12">
              <div className="row">
                <div className="col-xs-12 col-md-6">
                   <img src="" className="img-responsive" alt="" /> </div>
                <div className="col-xs-12 col-md-6">
                  <div className="about-text">
                    <h2>About Us</h2>
                    <h3>Why Choose Us?</h3>
                    <div className="list-style">
                      <div className="col-lg-6 col-sm-6 col-xs-12">
                        <ul>
                        </ul>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-xs-12">
                        <ul>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Divider className={classes.divider}/>
            </div>
          </div>
         
        </div>
        
      </>
    )
}

export default about
