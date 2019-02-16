import React, { Component } from 'react';

class InitLoader extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
          loadComplete: false,
      }
    }
    
    toggleLoadComplete = () => {
        this.setState({
            loadComplete: !this.state.loadComplete,
        });
    }
    
    componentDidMount() {
        setTimeout(this.toggleLoadComplete, 2000);
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