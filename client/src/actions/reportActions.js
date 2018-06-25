// Todo! Fix the crap code just below. Some destructuring should be user. Will do later. Maybe!

import axios from 'axios';
import {
    SAVE_REPORT
} from '../reducers/types';

export const saveReportAction = (report,history) => dispatch => {
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

export const clearReportAction = () => {

}