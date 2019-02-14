import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CopyIcon from '@material-ui/icons/OpenInNewRounded';
import CheckIcon from '@material-ui/icons/CheckCircle';


class PasswordItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCopied: false,
    }
  }
  
  getStyle = () => {
    //mark if over 30 days
    //TODO: Move time into config instead of inline value
    
    return {
      backgroundColor: Date.now() - this.props.password.createDate > 2592000000 ? '#fa9696' : '#f4f4f4'
    }
  }

  flipHasCopied = () => {
    this.setState({hasCopied: !this.state.hasCopied});
  }
  
  copyToClipboard = (e) => {
    navigator.clipboard.writeText(this.props.password.password);
   // e.target.disabled=true;
   this.setState({hasCopied: true});
   setTimeout(this.flipHasCopied,3000);
  }

  render() {
    return (
        <Grid container spacing={8} direction="row" justify="flex-start" alignItems="flex-end" style={{borderBottom: '1px #ccc dotted'}}>
          <Grid item xs={2}>
            <Button variant="contained" color="default"><EditIcon style = {{fontSize:18}}/></Button>
            <Button variant="contained" color="secondary" onClick={this.props.handleDeletePassword}><DeleteIcon style = {{fontSize:18}}/></Button>
            <Button variant="contained" color="primary" onClick={this.copyToClipboard}>{this.state.hasCopied ? <CheckIcon style = {{fontSize:18}}  />: <CopyIcon style = {{fontSize:18}}/>}
            </Button>
          </Grid>
          <Grid item xs={3} style = {this.getStyle()}>
            {this.props.password.password}
          </Grid>
          <Grid item style = {this.getStyle()}>
            <a href={this.props.password.url}>{this.props.password.url}</a>
          </Grid>
      </Grid>
    );
  }
}

//PropTypes
PasswordItem.propTypes = {
  password: PropTypes.object.isRequired
}

export default PasswordItem;
