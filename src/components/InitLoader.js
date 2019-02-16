import React, { Component } from 'react';
import ls from 'local-storage';

class InitLoader extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
          loadComplete: false,
          domains: [],
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
      this.props.loader(inDomains);
  }   
    toggleLoadComplete = () => {
        this.setState({
            loadComplete: !this.state.loadComplete,
        });
    }
    
    componentDidMount() {
    if (this.state.domains.length < 1) {
        let inDomains = ls.get('domains');
        if (inDomains != null && inDomains.length > 0) {
          this.setState({
          domains: inDomains,
          },this.toggleLoadComplete());
        } else {
            //Fetch valid domains
            fetch('https://react-test-jtrachtenberg.c9users.io:8081/fetch.php').then(response => response.json()).then(data => this.processDomains(JSON.parse(data))).then(() => this.toggleLoadComplete());

        }
    }
 
    }
    
    render() {
        return (
            <React.Fragment>
            {this.state.loadComplete ? <span></span> :
            <div className="loader-container">
                <div className="loader">
                 <div className="loader-title">Loading</div>
                </div>
            </div>
            }
            </React.Fragment>
        )
    }
}

export default InitLoader;