import {
    SAVE_REPORT,
    CLEAR_REPORT,
    SAVE_MANY_REPORTS,
    DELETE_REPORT
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
                report: action.payload,
                reports: [...state.reports, action.payload]
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