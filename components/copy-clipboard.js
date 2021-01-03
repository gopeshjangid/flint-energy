import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class Copy extends React.Component {
  state = {
    value: '',
    copied: false,
    show : false
  };

   handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      this.setState({show: false});
    }

    this.setState({show: false});
  };
 
  render() {
    return (
      <div>
        <CopyToClipboard text={this.props.value}
          onCopy={() => this.setState({copied: true ,show : true})}>
          <FileCopyOutlinedIcon />
        </CopyToClipboard>
        <Snackbar open={this.state.show} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity="info">
          Copied to clipboard!
        </Alert>
      </Snackbar>
      </div>
    );
  }
}