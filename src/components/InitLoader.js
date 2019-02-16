import React, { Component } from 'react';

class InitLoader extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
          loadComplete: false,
      }
    }
    
    render() {
        return (
            <div className="loader-container">
                <div className="loader">
                 <div className="loader-title"></div>
                </div>
            </div>
        )
    }
}

export default InitLoader;