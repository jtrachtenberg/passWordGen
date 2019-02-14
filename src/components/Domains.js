import React, { Component } from 'react';
//import DomainItem from './DomainItem';
import ls from 'local-storage';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

//const OXFORD_URL ="https://od-api.oxforddictionaries.com/api/v1";
//const DOMAINS_QUERY = "/domains/en";

class Domains extends Component {
    
  constructor(props) {
    super(props);
    this.state = {domains: [], currentDomain: 'none'};
  }
  
  //Take the JSON object and convert to an array of domain key/value pairs
  processDomains = (inData) => {
      var inDomains = [];
      if (inData == null) return; //In case this is called before the API returns.
      else {
        var json = inData.results; //skip the metadata included in the API
        inDomains.push({key: 'none', value: 'none'});
        Object.keys(json).forEach(function(key) {
           var newObject = {
                key: key,
                value: json[key]['en'], //this would need to be parameterized to support localization
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
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    //this.props.changeHandler(event.target.value);
  };
    
  componentDidMount() {
  //Make sure Domains are loaded
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
  
  render() {
      return (
<TextField
          id="standard-select-domain"
          select
          label="Domain"
          value={this.state.currentDomain}
          onChange={this.handleChange('currentDomain')}
          margin="normal"
        >
          {this.state.domains.map(option => (
            <MenuItem key={option.key} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>  
      );
  }
  
 /* render() {
    return this.state.domains.map((domain) => (
        <DomainItem optValue={domain.key} textValue={domain.value} />
        ));
  }*/
}

export default Domains;