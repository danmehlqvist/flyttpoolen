// Todo! Fix the crap code just below. Some destructuring should be user. Will do later. Maybe!

import axios from 'axios';
import {
    SAVE_REPORT,
    SAVE_MANY_REPORTS,
    DELETE_REPORT,
    LOAD_REPORT_TO_STATE
} from '../reducers/types';

export const getReportsWithinGivenDatesAction = (startDate, endDate) => dispatch => {
    axios.get(`/api/reports?startDate=${startDate}&endDate=${endDate}`)
        .then(reports => {
            dispatch({
                type: SAVE_MANY_REPORTS,
                payload: reports.data
            })
        }).catch(error => {
            console.log(error);
        })
}

export const deleteReportAction = (reportId) => dispatch =>  {
    axios.delete('/api/reports/' + reportId)
        .then((report) => {
            dispatch({
                type: DELETE_REPORT,
                payload: reportId
            })
        }).catch(errors => {
            console.log(errors);
        })
}

export const saveReportAction = (report, history) => dispatch => {
    const {
        userId,
        date,
        start,
        end,
        breakTime,
        hours,
        customer,
        comments
    } = report;

    const newEntry = {
        userId,
        date,
        hours,
        customer,
        comments
    };

    if (start) {
        newEntry.start = start;
        newEntry.end = end;
        newEntry.breakTime = breakTime;
    }
    // Now we have the newEntry with the values we want.

    axios.post('/api/reports', newEntry)
        .then(report => {
            dispatch({
                type: SAVE_REPORT,
                payload: report.data
            });
            history.push('/job-reported');
        }).catch(error => {
            console.error(error);
        })
}

export const loadReportToStateAction = (report) => dispatch => {
    dispatch({
        type: LOAD_REPORT_TO_STATE,
        payload: report
    })
}

export const clearReportAction = () => {

}