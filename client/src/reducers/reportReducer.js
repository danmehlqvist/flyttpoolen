import {
    SAVE_REPORT,
    CLEAR_REPORT,
    SAVE_MANY_REPORTS,
    DELETE_REPORT,
    LOAD_REPORT_TO_STATE
} from './types';

const initialState = {
    reports: [],
    report: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_REPORT:
            const newReports = state.reports.filter(report => {
                return report._id !== action.payload;
            })
            return {
                ...state,
                reports: newReports
            }
        case SAVE_MANY_REPORTS:
            return {
                ...state,
                reports: action.payload
            }

        case SAVE_REPORT:
            return {
                reports: [...state.reports, action.payload],
                report: action.payload,

            }
        case LOAD_REPORT_TO_STATE:
            return {
                ...state,
                report: action.payload
            }


        case CLEAR_REPORT:
            return {
                ...state,
                report: {}
            }

        default:
            return state;
    }
}