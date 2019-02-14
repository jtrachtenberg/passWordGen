import React, { Component } from 'react';
import './App.css';
import ls from 'local-storage';
//import { oxford_app_id, oxford_app_key } from './ApiKeys';
import CssBaseline from '@material-ui/core/CssBaseline';
import Passwords from './components/Passwords';
import PasswordForm from './components/PasswordForm';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    Passwords: [
        {
          id: 1,
          password: 'alateairbladderbreedplump',
          url: 'google.com',
          createDate: 1518239331000
        }, 
        {
           id: 2,
          password: '3alateairbladderbreedplump!',
          url: 'ebay.com',
          createDate: 1549746468327
        }
      ],
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
  
  //Load previous state from local storage
  componentDidMount() {
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
  }  
    /*componentDidMount() {
    fetch(LATEST_URL)
    .then(response => response.json())
    .then(json => this.setState({
      latestArticles: json.results,
      readNow: ls.get('readNow') || [],
      readLater: ls.get('readLater') || [],
      likedSections: ls.get('likedSections') || [],
      articleWireType: "latest",
    }));
  

    }*/
  
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

      <Passwords passwords={this.state.Passwords} handleDeletePassword={this.handleDeletePassword}/>
      <Button variant="contained" color="primary" onClick={this.toggleModal}><AddIcon style = {{fontSize:32}}/></Button>
      </div>
      {
        this.state.showForm ?
         <PasswordForm closePopup={this.toggleModal} savePassword={this.handleSavePassword} maxID={this.state.maxID} />
         : null
      }
      </React.Fragment>
    );
  }
}

export default App;
