import React, { Component } from 'react';
import './App.css';
import ls from 'local-storage';
//import { oxford_app_id, oxford_app_key } from './ApiKeys';
import CssBaseline from '@material-ui/core/CssBaseline';
import Passwords from './components/Passwords';
import PasswordForm from './components/PasswordForm';
import InitLoader from './components/InitLoader';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Passwords: [],
      domains: [],
      showForm: false,
      maxID: 0,
      password: {},
    }
  }
  
  toggleModal = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  }
  
  setDomains = (domains) => {
    this.setState ({domains: domains});
  }
  
  //Load previous state from local storage
  componentDidMount() {
    if (this.state.Passwords.length === 0) this.toggleModal();
    let inState = ls.get('Passwords');
    if (inState != null && inState.length > 0) {
      this.setState({
      Passwords: inState,
      });
    }
    inState = ls.get('maxID');
    if (inState) {
      this.setState({
        maxID: inState,
      })
    }
    inState = ls.get('domains');
    if (inState) {
      this.setState({
        domains: inState,
      });
    }
  }  
  
  handleDeletePassword = (password) => {
    const truncatedList = this.state.Passwords.slice(0);
    truncatedList.splice(truncatedList.indexOf(password), 1);
    this.setState({
      Passwords: truncatedList
    });
    ls.set('Passwords', truncatedList);
  }
  
  handleSavePassword = (password) => {
   let currentPasswords = this.state.Passwords.slice(0);
   if (!this.state.Passwords.includes(password)) {
      const newPasswords = [...currentPasswords, password];
      this.setState({
        Passwords: newPasswords,
        maxID: password.id
      });
      ls.set('Passwords', newPasswords);
      ls.set('maxID', password.id);
   }
  }
  
  render() {
    return (
      <React.Fragment>
      <CssBaseline />
      <div className="App">
      {this.state.Passwords.length > 0 ? 
        <Passwords passwords={this.state.Passwords} handleDeletePassword={this.handleDeletePassword}/> : <InitLoader loader={this.setDomains} />
      }
      <Button variant="contained" color="primary" onClick={this.toggleModal}><AddIcon style = {{fontSize:32}}/></Button>
      </div>
      {
        this.state.showForm && this.state.domains.length > 0 ?
         <PasswordForm domains={this.state.domains} closePopup={this.toggleModal} savePassword={this.handleSavePassword} maxID={this.state.maxID} />
         : null
      }
      </React.Fragment>
    );
  }
}

export default App;
