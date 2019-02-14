import React, { Component } from 'react';

class Modal extends Component {
    
    
  constructor(props) {
    super(props);
    this.state = {password: ''};
  }
  
  handleSubmit = (e) => {

    let newmaxID = this.props.maxID+1;
    this.props.savePassword({id: newmaxID, password: this.state.password, url: 'google.com', createDate: Date.now()});
    e.preventDefault();
  }
  
  handleChange = (e) => {
      this.setState({password: e.target.value});
  }
  render() {
    return (
      <div className='modal'>
        <div className='modal_inner'>
          <h1>{this.props.text}</h1>
     <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

export default Modal;