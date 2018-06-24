import React from 'react';
import PropTypes from 'prop-types';

import './TextFieldInput.css';

const TextFieldInput = (props) => {

    return (
        <div className="TextFieldInput">
            <div className="label">{props.label}</div>
            <input
                name={props.name}
                value={props.value}
                style={props.error && { border: "1px solid red" }}
                type={props.type}
                onChange={props.onChange}
            />
            {props.info && <div className="info">{props.info}</div>}
            {props.error && <div className="error"> {props.error} </div>}
        </div>
    )
}

TextFieldInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default TextFieldInput;
