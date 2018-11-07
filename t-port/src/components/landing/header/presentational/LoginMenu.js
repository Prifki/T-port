import React, { Component } from 'react';
import CloseButton from './CloseButton';
import SubmitButton from './SubmitButton';

class LoginMenu extends Component {
  render() {
    const className = this.props.isLoginMenuOpen ? 'menu menu--login menu--login--active' : 'menu menu--login';
    return (
        <div className={className}>
            <CloseButton  onClick={this.props.toggleLoginMenu} />
            <h3 className="menu__title">Sign in</h3>
            <input className="menu__input" type="text" placeholder="Login" id="login-field" />
            <input className="menu__input" type="password" placeholder="Password" id="password-field" />
            <SubmitButton id="login-button" text="Sign in"/>
        </div>
    );
  }
}

export default LoginMenu;
