import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './JobReported.css';

import BigButton from './common/BigButton';

class JobReported extends Component {
    render() {

        const date = moment(this.props.reports.report.date).format('dddd DD/MM');
        const capitalizedDate = date.charAt(0).toUpperCase() + date.slice(1);

        return (
            <div className="JobReported">
                <h1>Jobb rapporterat</h1>
                <h2>{capitalizedDate}</h2>
                <p>{this.props.reports.report.hours} timmar hos {this.props.reports.report.customer}</p>
            
                <BigButton
                    buttonText="Rapportera mer jobb"
                    onClick={()=>{
                        this.props.history.push('/create-entry');
                    }}
                />
                <BigButton
                    buttonText="Klar!"
                    onClick={()=>{
                        this.props.history.push('/dashboard');
                    }}
                />
                


            </div>
        )
    }

    componentWillMount = () => {
        if (Object.keys(this.props.reports.report).length === 0) {
            this.props.history.push('/dashboard');
        }
    }
}

const mapStateToProps = state => ({
    reports: state.reports
})

export default connect(mapStateToProps)(JobReported);