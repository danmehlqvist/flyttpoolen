import React from 'react';
import PropTypes from 'prop-types';

import './BigButton.css'


const BigButton = (props) => {

    if (props.buttonText === '') {
        console.error('Warning: Please enter a non-zero length string for prop buttonText to component BigButton');
    }

    return (
        <div className="BigButton" onClick={props.onClick}>
            {props.buttonText}
        </div>
    )
};

BigButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired
}

export default BigButton;
