// Todo!!! Have made some very weird calculations about setting the breakTime times. Why not just do end-start-break?

import React, { Component } from 'react'
import moment from 'moment';
import 'moment/locale/sv';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { connect } from 'react-redux';


import './CreateEntry.css';
import { saveReportAction } from '../actions/reportActions';


class CreateEntry extends Component {

    state = {
        date: moment().hours(7).minute(30),
        start: moment().hours(7).minute(30),
        end: moment().hours(10).minute(30),
        breakTime: moment().hours(0).minute(0),
        editTimes: true,
        hours: 3,
        customer: '',
        comments: '',
        errors: {}
    }

    render() {
        return (
            <div className="CreateEntry">
                <h1>Rapportera jobb</h1>
                <form onSubmit={this.onSubmit} autoComplete="flyttpoolen">
                    <div className="label">Datum</div>
                    <DatePicker
                        className="DatePicker"
                        selected={this.state.date}
                        locale="sv"
                        onChange={this.onChangeDate}
                        value={this.state.date.format("YYYY-MM-DD")}
                    />
                    <div className="time">
                        <div>
                            <p>Start-tid</p>
                            <TimePicker
                                // className="adjust-timepicker"
                                readonly
                                // onClick={hideVirtualKeyboard()}
                                onFocus={e=>{
                                    e.target.blur();
                                }}
                                allowEmpty={false}
                                // className="TimePicker"
                                minuteStep={30}
                                showSecond={false}
                                onChange={this.onChangeStart}
                                // onChange={this.onChangeHoursCalc}
                                value={this.state.start}
                                disabled={!this.state.editTimes}
                                name="start"
                            />
                        </div>

                        <div>
                            <p>Slut-tid</p>
                            <TimePicker
                                inputReadOnly
                                // onfocus="blur();"
                                allowEmpty={false}
                                className="TimePicker"
                                minuteStep={30}
                                showSecond={false}
                                onChange={this.onChangeEnd}
                                // onChange={this.onChangeHoursCalc}
                                value={this.state.end}
                                disabled={!this.state.editTimes}
                                name="end"
                            />
                        </div>

                        <div>
                            <p>Rast</p>
                            <TimePicker

                                // onFocus="blur();"
                                allowEmpty={false}
                                className="TimePicker"
                                minuteStep={30}
                                showSecond={false}
                                // onChange={this.onChangeHoursCalc}
                                onChange={this.onChangeBreak}
                                value={this.state.breakTime}
                                disabled={!this.state.editTimes}
                                name="hours"
                            />
                        </div>
                        <div className="checkbox">
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    if (!this.state.editTimes) {
                                        const mins = (this.state.end - this.state.start) / 60 / 1000 - (this.state.breakTime.hours() * 60 + this.state.breakTime.minute());
                                        this.setState((prevState) => ({
                                            hours: mins / 60
                                        }))
                                    }
                                    this.setState((prevState) => ({
                                        editTimes: !prevState.editTimes
                                    }))
                                }}
                            />
                        </div>

                    </div>

                    <div className="label">Timmar</div>
                    <input
                        min="0.5"
                        value={this.state.hours}
                        type="number"
                        disabled={this.state.editTimes}
                        step="0.5"
                        name="hours"
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            this.setState(() => ({
                                hours: value
                            }));
                        }}
                    />
                    {this.state.errors.hours && <div className="erorr">{this.state.errors.hours}</div>}

                    <div className="label">Kund</div>
                    <input
                        autoComplete='flyttpoolen'
                        type="text"
                        name="customer"
                        onChange={this.onChangeCustomerOrComments}
                    />

                    <div className="label">Kommentarer</div>
                    <textarea
                        name="comments"
                        onChange={this.onChangeCustomerOrComments}
                    />

                    <br /><input disabled={!this.state.customer && Object.keys(this.state.errors).length === 0} type="submit" />
                </form>
                <button onClick={() => this.props.history.push('/dashboard')}>Tillbaka</button>
            </div>
        )
    }

    componentDidMount = () => {
        // document.querySelector('.rc-time-picker-input').setAttribute('readonly','true');
        // document.querySelector('.rc-time-picker-input').setAttribute('readOnly','true');
        // console.log(timepicker);
        
        // console.log(input);
    }

    onChangeCustomerOrComments = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(() => ({
            [name]: value.trim()
        }))
    }


    onChangeBreak = e => {
        const mins = (this.state.end - this.state.start) / 60 / 1000 - (e.hours() * 60 + e.minute());
        let error = {};
        if (mins <= 0) {
            error.hours = "Mer rast än arbete? Bra där!";
        }
        this.setState((prevState) => ({
            start: prevState.start,
            hours: mins / 60,
            end: prevState.end,
            errors: error,
            breakTime: e
        }));

    }

    onChangeStart = e => {
        let error = {};
        const mins = (this.state.end - e) / 60 / 1000 - (this.state.breakTime.hours() * 60 + this.state.breakTime.minute());
        if (mins <= 0) {
            error.hours = "Negativa timmar";
        }
        this.setState((prevState) => ({
            start: e,
            hours: mins / 60,
            errors: error,
            end: prevState.end,
            breakTime: prevState.breakTime
        }));
    }

    onChangeEnd = time => {
        let error = {};

        const mins = (time - this.state.start) / 60 / 1000 - (this.state.breakTime.hours() * 60 + this.state.breakTime.minute());
        if (mins <= 0) {
            error.hours = "Negativa timmar";
        }
        this.setState((prevState) => ({
            start: prevState.start,
            hours: mins / 60,
            errors: error,
            end: time,
            breakTime: prevState.breakTime
        }));
    }

    onSubmit = e => {
        // Validation is taken care of by disabling the submit button
        e.preventDefault();
        const newEntry = {
            userId: this.props.user.user.id,
            date: Number(this.state.date),
            hours: this.state.hours,
            customer: this.state.customer,
            comments: this.state.comments,
            start: this.state.editTimes ? Number(this.state.start) : null,
            end: this.state.editTimes ? Number(this.state.end) : null,
            breakTime: this.state.editTimes ? Number(this.state.breakTime) : null
        };

        this.props.saveReportAction(newEntry, this.props.history);
    }

    onChangeDate = date => {
        console.log(date);
        this.setState(() => ({
            date
        }));
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { saveReportAction })(CreateEntry);