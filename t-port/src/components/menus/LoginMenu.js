import React, { Component } from 'react';
import CloseButton from './CloseButton';

class LoginMenu extends Component {
  render() {
    return (
        <div className="menu menu--login">
            <CloseButton />
            <h3 className="menu__title">Sign in</h3>
            <input className="menu__input" type="text" placeholder="Login" id="login-field" />
            <input className="menu__input" type="password" placeholder="Password" id="password-field" />
            <a className="menu__button--submit" id="login-button">Sign in</a>
        </div>
    );
  }
}

export default LoginMenu;
