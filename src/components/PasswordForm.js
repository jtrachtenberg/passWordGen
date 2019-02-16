import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/SaveAltRounded';
import CancelIcon from '@material-ui/icons/CancelRounded';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from 'react-select';
import ls from 'local-storage';

class PasswordForm extends Component {

  constructor(props) {
      super(props);
      this.state = {
          password: '',
          url: '',
          showPassword: true,
          results: [],
          domains: [],
          fetchComplete: 0,
          fetchStart: true,
          currentDomain: null,
          wordOrder: ['adjective','noun','verb','adverb']
      }
  }
    //Take the JSON object and convert to an array of domain key/value pairs
  processDomains = (inData) => {
      console.log('processDomains');
      var inDomains = [];
      if (inData == null) return; //In case this is called before the API returns.
      else {
        var json = inData.results; //skip the metadata included in the API
        Object.keys(json).forEach(function(key) {
           var newObject = {
                value: key,
                label: json[key]['en'], //this would need to be parameterized to support localization
            }
            inDomains.push(newObject);
        });          
      }
      
      //Update the state
      this.setState({
            domains: inDomains
      });
      ls.set('domains', inDomains);
  }
  
  //Take the JSON object and convert to an array of domain key/value pairs
  processWords = (inData) => {
        var inWords = [];
        inData.forEach(result => {
        //console.log(JSON.parse(result));
        try {
        var json = JSON.parse(result).results; //skip the metadata included in the API
        //console.log(json);
        Object.keys(json).forEach(function(key) {
           var newObject = {
                key: json[key]['id'],
                value: json[key]['word'],
            }
            inWords.push(newObject);
        }) 
        } catch(error) {
          console.log(error);
        }
        });
         
    return inWords;
  }
  
  //Set the new password in the order given in wordOrder
  //check state to ensure that all fetch activity to the API is complete
  setNewPassword = (results) => {
      var newPassword = '';
      results.forEach(result => {
        newPassword += result.value;  
      })

      this.setState({fetchStart: false,fetchComplete: 0, password: newPassword.replace(/\s/g,'')});
  }
  
  runAllFetch = (inQueries) => {
      var retRequests = [];
      inQueries.forEach((query) => {
        retRequests.push(fetch(query.query).then(response => response.json()).then(data => {return JSON.parse(data)}));
        //var result = this.runFetchString(query.query);
        //retRequests.push({lex: query.lex, queryresult: result});
        //console.log(result);
        //retRequests.push(result);
      });
      return retRequests;
  }
  
  getConstValue = (inValue) => {
      const ret = inValue;
      return ret;
  }
  runFetchString = (inFetchString) => {
      //var ret = null;
      return fetch(inFetchString).then(response => response.json()).then(json => this.getConstValue(json));
      //console.log(ret);
     // return ret;
  }
  //Start process to create new password
  //check state to ensure that only one process is running at a time
  fetchNewWords = () => {

      //build the queries
      var baseUrl = 'https://react-test-jtrachtenberg.c9users.io:8081/fetch.php?cmd=';
      var queries = [];
           //Fetch a new password
        this.state.wordOrder.forEach((lexical,index) => {
        var qstring = "/wordlist/en/lexicalCategory="+lexical+";";
        if (this.state.currentDomain != null) {
            console.log(this.state.currentDomain.value);
            qstring += "domains="+this.state.currentDomain.value;
        }
        qstring += "?limit=1";
        queries.push(baseUrl+qstring);
      });
      //  fetch(baseUrl+qstring).then(response => response.json()).then(data => this.processWords(JSON.parse(data),lexical)).then(() => {currFetch += 1;if (currFetch == this.state.wordOrder.length-1) this.setState({fetchComplete: currFetch},() => this.setNewPassword());}).catch((error) => {console.log(error);});
      // use map() to perform a fetch and handle the response for each url
    Promise.all(queries.map(url =>
  fetch(url)
    .then(response => response.json()))).then(data => this.processWords(data)).then(words => this.setNewPassword(words));
      
      
      //return Promise.all([this.runAllFetch(queries)]);
  }
  componentDidMount() {
    if (this.state.domains.length < 1) {
        let inDomains = ls.get('domains');
        if (inDomains != null && inDomains.length > 0) {
          this.setState({
          domains: inDomains,
          });
        } else {
            //Fetch valid domains
            fetch('https://react-test-jtrachtenberg.c9users.io:8081/fetch.php').then(response => response.json()).then(data => this.processDomains(JSON.parse(data)));

        }
    }
    
  }
  
  componentDidUpdate() {
    //Check if we need to update the password
    console.log('contentDidUpdate'+this.state.fetchStart);
    if (this.state.fetchStart)
      this.fetchNewWords();//.then(then(([requests]) =>this.processWords(requests)).then((results) => this.setNewPassword(results));
  }
  
  updateCurrentDomain = (domain) => {
      console.log('updateCurrentDomain')
      this.setState({ 'fetchStart': true, 'currentDomain': domain});
  }
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  
  handleDomainChange = currentDomain => {
      this.setState({currentDomain, fetchStart: true});
  }
  
  handleSubmit = (e) => {
    const newmaxID = this.props.maxID+1;
    
   this.props.savePassword({id: newmaxID, password: this.state.password, url: this.state.url, createDate: Date.now()});
   this.props.closePopup();
    e.preventDefault();
  }
  
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <Grid container spacing={8} direction="row" justify="flex-start" alignItems="flex-end" style={{borderBottom: '1px #ccc dotted'}}>
          <Grid item xs={2}>
          <Button variant="contained" color="secondary" onClick={this.props.closePopup}><CancelIcon style = {{fontSize: 18}} /></Button>
          <Button variant="contained" color="primary" onClick={this.handleSubmit}><SaveIcon style = {{fontSize:18}}/></Button>
          </Grid>
          <Grid item xs={4}>
          <FormControl>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
          </Grid>
          <Grid item xs={2}>
          <FormControl>
          <InputLabel htmlFor="adornment-url">URL</InputLabel>
          <Input
            id="adornment-url"
            type='text'
            value={this.state.url}
            onChange={this.handleChange('url')}
          />
        </FormControl>        
          </Grid>
          <Grid item xs={2}>
            <Select
                value={this.state.currentDomain}
                onChange={this.handleDomainChange}
                options={this.state.domains}
      />
          </Grid>
      </Grid>        
      
        </form>
      </div>
    );
  }
}

export default PasswordForm;

/*
<select><Domains /></select>
*/