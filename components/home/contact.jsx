import React, { Component } from "react";
import Footer from "../common/footer";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
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
function Contact (props) {
  const classes = useStyles();
    return (
      <div>
        <div id="contact">
          <div className="container">
            <div className="col-md-12">
              <div className="row">
                <div className="section-title">
                   <Typography  component="h2" >Get In Touch </Typography>
                  <Typography component="p">
                    Please fill out the form below to send us an email and we
                    will get back to you as soon as possible.
                  </Typography>
                </div>
                <form name="sentMessage" id="contactForm" noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Name"
                          required="required"
                        />
                        <Typography ></Typography>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="Email"
                          required="required"
                        />
                        <Typography ></Typography>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Message"
                      required
                    ></textarea>
                    <Typography ></Typography>
                  </div>
                  <div id="success"></div>
                  <button type="submit" className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item">
                 <Typography component="h3">Contact Info</Typography>
                <Typography component="p">
                  <span>
                    <i className="fa fa-map-marker"></i> Address
                  </span>
                  {props.data ? props.data.address : "loading"}
                </Typography>
              </div>
              <div className="contact-item">
                <Typography component="p">
                  <span>
                    <i className="fa fa-phone"></i> Phone
                  </span>{" "}
                  {props.data ? props.data.phone : "loading"}
                </Typography>
              </div>
              <div className="contact-item">
                <Typography component="p">
                  <span>
                    <i className="fa fa-envelope-o"></i> Email
                  </span>{" "}
                  {props.data ? props.data.email : "loading"}
                </Typography>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="social">
                  <ul>
                    <li>
                      <a
                        href={props.data ? props.data.facebook : "/"}
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href={props.data ? props.data.twitter : "/"}>
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href={props.data ? props.data.youtube : "/"}>
                        <i className="fa fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer">
          
          <Footer/>
          
        </div>
      </div>
    );
}

export default Contact;
