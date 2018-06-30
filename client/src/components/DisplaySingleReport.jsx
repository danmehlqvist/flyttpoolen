import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './DisplaySingleReport.css';
import { deleteReportAction } from '../actions/reportActions';

class DisplaySingleReport extends Component {
  render() {
    return (
      <div className="DisplaySingleReport">
        <h1>{moment(this.props.report.date).format('YYYY-MM-DD')}</h1>
        {this.props.report.start ? (
          <div>
            {makeNiceLookingTimeDisplay(moment(this.props.report.start).hour(), moment(this.props.report.start).minute())} -
            {makeNiceLookingTimeDisplay(moment(this.props.report.end).hour(), moment(this.props.report.end).minute())} -
            {makeNiceLookingTimeDisplay(moment(this.props.report.breakTime).hour(), moment(this.props.report.breakTime).minute())}
          </div>
        ) : (
            <div>test</div>
          )}
        <div>Totalt: {String(this.props.report.hours).replace('.', ',')} timmar</div>
        <div>{this.props.report.customer}</div>
        <div>{this.props.report.comments}</div>
        <button onClick={this.deleteButtonClick}>Radera</button>
        <button>Ändra</button>
        <button onClick={() => this.props.history.push('/dashboard')}>Tillbaka</button>

      </div>
    )
  }
  componentDidMount = () => {
    if (!this.props.report.customer) {
      this.props.history.push('/dashboard');
    }
  }

  deleteButtonClick = e => {
    this.props.deleteReportAction(this.props.report._id);
    this.props.history.push('/dashboard');
  }
}

const makeNiceLookingTimeDisplay = (hours, minutes) => {
  let output = hours < 10 ? "0" + String(hours) : String(hours);
  output += ':';
  output += minutes === 0 ? "00" : "30";
  return output;
}

const mapStateToProps = state => ({
  report: state.reports.report
});

export default connect(mapStateToProps, { deleteReportAction })(DisplaySingleReport);