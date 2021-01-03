import React from 'react';
import FacebookLogin from 'react-facebook-login';
 import ArticleService from  "./service/ArticleService";
class Login extends React.Component {
  async responseFacebook(response) {
    console.log("fb login-->",response)
    let pageToken = await ArticleService.GetPageToken(response.accessToken);
    console.log("pageToken------" ,pageToken);
  }
 
  render() {
    return (
      <FacebookLogin
        appId={process.env.APPID}
        autoLoad={true}
        scope="public_profile"
        version={"8.0"}
        fields="name,pages_manage_instant_articles"
        callback={this.responseFacebook}
      />
    )
  }
}
 
export default Login;