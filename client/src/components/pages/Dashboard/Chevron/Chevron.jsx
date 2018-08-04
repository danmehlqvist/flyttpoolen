// Component takes two props:
// 1. leftOrRight is a string with value either "left" or "right"
// 2. handler is the function onClick handler
import React from 'react';
// import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {library } from '@fortawesome/fontawesome-svg-core';
// library.add(faChevronLeft);

import './Chevron.css';

export default (props) => {
    
  
    return (
    <div className="Chevron">
        <button onClick={props.handler}>{props.leftOrRight==="left"? " < < < ":" > > > "}</button>
    </div>
  )
}

