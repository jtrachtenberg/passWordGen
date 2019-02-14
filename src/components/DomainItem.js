/* Deprecated - replaced with React-Select in PasswordForm */

import React, { Component } from 'react';

class DomainItem extends Component {
  render() {
    return (
      <option value={this.props.optValue} >{this.props.textValue}</option>
    );
  }
}

export default DomainItem;