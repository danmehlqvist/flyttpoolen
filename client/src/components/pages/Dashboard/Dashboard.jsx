// Todo! Clean up the horrible looking crap code in componentWillMount. Maybe lift out to external file?
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import './Dashboard.css';
import { getReportsWithinGivenDatesAction } from '../../../actions/reportActions';

import WorkTable from './WorkTable/WorkTable';
import Chevron from './Chevron/Chevron';

// import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';

class Dashboard extends Component {

    state = {
        start: {
            day: null,
            month: null,
            year: null
        },
        end: {
            day: null,
            month: null,
            year: null
        }
    }

    render() {

        const { startDate, endDate } = this._buildStartAndEndDateStrings();
        this.props.getReportsWithinGivenDatesAction(startDate, endDate);


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
                <h1>{this._getNameOfMonth(this.state.start.month)} {this.state.start.year} - {this._getNameOfMonth(this.state.end.month)} {this.state.end.year}</h1>
                <div className="chevronGrid">
                    <Chevron leftOrRight="left" handler={this._handleButtonLeft} />
                    <Chevron leftOrRight="right" handler={this._handleButtonRight} />
                </div>
                {/* {this._getStartAndEndDateOfWorkPeriod()} */}
                <p>Arbetade timmar: {totalHoursWorked}</p>
                <p style={{ marginBottom: "40px" }}>Arbetade dagar: {workingDays}</p>
                <Link className="Link" to="/create-entry">Rapportera arbete</Link>
                <WorkTable
                    data={this.props.reports}
                />

            </div>
        )
    }

    _getNameOfMonth = month => {
        switch (month) {
            case 0: return 'Jan';
            case 1: return 'Feb';
            case 2: return 'Mar';
            case 3: return 'Apr';
            case 4: return 'Maj';
            case 5: return 'Jun';
            case 6: return 'Jul';
            case 7: return 'Aug';
            case 8: return 'Sep';
            case 9: return 'Okt';
            case 10: return 'Nov';
            case 11: return 'Dec';
            default: return 'Vafan?'
        }
    }

    componentWillMount = () => {

        // Calculate startDate and endDate
        const today = moment();
        const date = today.date();
        const month = today.month();
        const year = today.year();

        let startDate;
        let endDate;

        if (month === 0 && date <= 15) { //Early January
            startDate = {
                day: 16,
                month: 11,
                year: year - 1,
            }
            endDate = {
                day: 15,
                month: 0,
                year
            }
        } else if (month === 11 & date > 15) {
            startDate = {
                day: 16,
                month: 12,
                year
            }
            endDate = {
                day: 15,
                month: 1,
                year: year + 1
            }
        } else if (date > 15) {
            startDate = {
                day: 16,
                month: month + 1,
                year: year
            }
            endDate = {
                day: 15,
                month: month + 2,
                year
            }
        } else {    //date <= 16
            startDate = {
                day: 16,
                month: month,
                year
            }
            endDate = {
                day: 15,
                month: month + 1,
                year
            }
        }

        this.setState(() => ({
            start: startDate,
            end: endDate
        }));

    }
    // componentDidMount = () => {

    //     if (Object.keys(this.props.reports).length === 0) {
    //         const { startDate, endDate } = this._buildStartAndEndDateStrings();
    //         this.props.getReportsWithinGivenDatesAction(startDate, endDate);
    //     }
    // }

    _handleButtonLeft = () => {
        const startMonth = this.state.start.month === 0 ? 11 : this.state.start.month - 1;
        const startYear = this.state.start.month === 0 ? this.state.start.year - 1 : this.state.start.year;
        const endMonth = this.state.end.month === 0 ? 11 : this.state.end.month - 1;
        const endYear = this.state.end.month === 0 ? this.state.end.year - 1 : this.state.end.year;
        this.setState((prevState) => ({
            start: {
                ...prevState.start,
                month: startMonth,
                year: startYear
            },
            end: {
                ...prevState.end,
                month: endMonth,
                year: endYear
            }
        }));
    }

    _handleButtonRight = () => {
        const startMonth = this.state.start.month === 11 ? 0 : this.state.start.month + 1;
        const startYear = this.state.start.month === 11 ? this.state.start.year + 1 : this.state.start.year;
        const endMonth = this.state.end.month === 11 ? 0 : this.state.end.month + 1;
        const endYear = this.state.end.month === 11 ? this.state.end.year + 1 : this.state.end.year;
        this.setState((prevState) => ({
            start: {
                ...prevState.start,
                month: startMonth,
                year: startYear
            },
            end: {
                ...prevState.end,
                month: endMonth,
                year: endYear
            }
        }));
    }

    _buildStartAndEndDateStrings = () => {
        const stringifyNumber = (number) => number < 10 ? "0" + number.toString() : number.toString();

        let startDate = stringifyNumber(this.state.start.year) + stringifyNumber(this.state.start.month) + stringifyNumber(this.state.start.day);
        let endDate = stringifyNumber(this.state.end.year) + stringifyNumber(this.state.end.month) + stringifyNumber(this.state.end.day);
        return {
            startDate,
            endDate
        };
    }
}



const mapStateToProps = state => ({
    reports: state.reports.reports,
    report: state.reports.report
})

export default connect(mapStateToProps, { getReportsWithinGivenDatesAction })(Dashboard);



   // const thisMonthString = addZero(monthNumber + 1);

        // const previousMonthString = addZero(monthNumber);
        // const nextMonthString = monthNumber === 11 ? "01" : addZero((monthNumber + 2));

        // const thisYearString = String(yearNumber);
        // const previousYearString = monthNumber === 0 ? String((yearNumber - 1)) : String(yearNumber);
        // const nextYearString = monthNumber === 11 ? String((yearNumber + 1)) : String(yearNumber);

        // let startDate;
        // let endDate;

        // if (dateNumber > 15) {
        //     startDate = `${thisYearString}${thisMonthString}16`;
        //     endDate = `${nextYearString}${nextMonthString}15`;
        // } else {
        //     startDate = `${previousYearString}${previousMonthString}16`;
        //     endDate = `${thisYearString}${thisMonthString}15`;
        // }
        // this.setState(() => ({
        //     startMonth: dateNumber > 15 ? monthNumber : monthNumber - 1
        // }));
