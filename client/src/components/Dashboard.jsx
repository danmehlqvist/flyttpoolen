// Todo! Clean up the horrible looking crap code in componentWillMount. Maybe lift out to external file?
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import './Dashboard.css';
import { getReportsWithinGivenDatesAction } from '../actions/reportActions';

import WorkTable from './common/WorkTable';

class Dashboard extends Component {

    state = {
        startMonth: null
    }

    render() {

        let totalHoursWorked;
        let workingDays;
        if (this.props.reports) {
            totalHoursWorked = this.props.reports.reduce((acc, report) => acc + report.hours, 0);

            workingDays = new Set(
                this.props.reports.map(report => {
                    return moment(report.date).date();
                })
            ).size;
        }

        return (
            <div className="Dashboard">
                <h1>Löneperiod {this._getNameOfMonth(this.state.startMonth)} - {this._getNameOfMonth(this.state.startMonth + 1)}</h1>
                <p>Arbetade timmar: {totalHoursWorked}</p>
                <p style={{marginBottom:"40px"}}>Arbetade dagar: {workingDays}</p>
                <Link className="Link" to="/create-entry">Rapportera arbete</Link>
                <WorkTable
                    data={this.props.reports}
                />

            </div>
        )
    }

    _getNameOfMonth = month => {
        switch (month) {
            case 0: return 'Januari';
            case 1: return 'Februari';
            case 2: return 'Mars';
            case 3: return 'April';
            case 4: return 'Maj';
            case 5: return 'Juni';
            case 6: return 'Juli';
            case 7: return 'Augusti';
            case 8: return 'September';
            case 9: return 'Oktober';
            case 10: return 'November';
            case 11: return 'December';
            default: return 'Vafan?'
        }
    }

    componentWillMount = () => {

        // Calculate startDate and endDate
        const today = moment();
        const dateNumber = today.date();
        const monthNumber = today.month();
        const yearNumber = today.year();

        // Creates a string from a number. If only one digit, then it adds a 0 to start with
        const addZero = number => number <= 9 ? "0" + number : String(number);

        const thisMonthString = addZero(monthNumber + 1);

        const previousMonthString = addZero(monthNumber);
        const nextMonthString = monthNumber === 11 ? "01" : addZero((monthNumber + 2));

        const thisYearString = String(yearNumber);
        const previousYearString = monthNumber === 0 ? String((yearNumber - 1)) : String(yearNumber);
        const nextYearString = monthNumber === 11 ? String((yearNumber + 1)) : String(yearNumber);

        let startDate;
        let endDate;

        if (dateNumber > 15) {
            startDate = `${thisYearString}${thisMonthString}16`;
            endDate = `${nextYearString}${nextMonthString}15`;
        } else {
            startDate = `${previousYearString}${previousMonthString}16`;
            endDate = `${thisYearString}${thisMonthString}15`;
        }
        this.setState(() => ({
            startMonth: dateNumber > 15 ? monthNumber : monthNumber - 1
        }));

        if (Object.keys(this.props.reports).length === 0) {
            this.props.getReportsWithinGivenDatesAction(startDate, endDate);
        }
    }
}

const mapStateToProps = state => ({
    reports: state.reports.reports,
    report: state.reports.report
})

export default connect(mapStateToProps, { getReportsWithinGivenDatesAction })(Dashboard);