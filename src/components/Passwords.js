import React, { Component } from 'react';
import PasswordItem from './PasswordItem';
import PropTypes from 'prop-types';


class Passwords extends Component {
  render() {
    return this.props.passwords.map((password) => (
        <PasswordItem key={password.id} password={password} handleDeletePassword={this.props.handleDeletePassword}/>
        ));
  }
}

//PropTypes
Passwords.propTypes = {
  passwords: PropTypes.array.isRequired
}

export default Passwords;
