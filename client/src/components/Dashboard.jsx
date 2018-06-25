import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <div className="Dashboard">
                <h1>Dashboard</h1>
                <Link to="/create-entry">Rapportera arbete</Link>
            </div>
        )
    }

    componentWillMount = () => {


    }
}

export default Dashboard;