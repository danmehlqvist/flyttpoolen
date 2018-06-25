import React from 'react'
import { Link } from 'react-router-dom';

import flyttpoolenLogo from '../../images/flyttpoolen.png';
import './Header.css';



export default () => {
    return (
        <div className="Header">
            <Link to="/dashboard">
                <img src={flyttpoolenLogo} alt="Flyttpoolen logo!" />
            </Link>
        </div>
    )
}
