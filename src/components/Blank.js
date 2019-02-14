import React, { Component } from 'react';

class Blank extends Component {
  render() {
    return (
      <div>
      
      </div>
    );
  }
}

export default Blank;

  //use an arrow function for scope of this object
  /*handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }*/