import React from 'react';
import CloseButton from './CloseButton';
import SubmitButton from './SubmitButton';

function LoginMenu (props) {
    const menuClass = props.isLoginMenuOpen ? 'menu menu--login menu--login--active' : 'menu menu--login';
    return (
        <div className={menuClass}>
            <CloseButton  onClick={props.toggleLoginMenu} />
            {!props.isLogged ?
              <>
                <h3 className="menu__title">Sign in</h3>

                <input className={props.loginFieldsClassName} type="text" placeholder="Login" onChange={props.updateUserNameFieldValue} onFocus={props.resetLoginInputClass} value={props.userNameFieldValue} />

                <input className={props.loginFieldsClassName} type="password" placeholder="Password" onChange={props.updatePasswordFieldValue} onFocus={props.resetLoginInputClass} value={props.passwordFieldValue} />
                <SubmitButton text="Sign in" onClick={props.authorizate} />
              </>
            :
                <p className="menu--login__welcome-text">Welcome, {props.userNameFieldValue}!</p>
            }
        </div>
    );
}

export default LoginMenu;
