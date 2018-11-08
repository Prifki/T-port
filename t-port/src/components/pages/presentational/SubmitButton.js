import React from 'react';

function SubmitButton(props) {
    return (
      <span className="menu__button--submit" onClick={props.onClick}>{props.text}</span>
    );
}

export default SubmitButton;