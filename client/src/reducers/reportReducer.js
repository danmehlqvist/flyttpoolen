import {
    SAVE_REPORT,
    CLEAR_REPORT,
    SAVE_MANY_REPORTS,
} from './types';

const initialState = {
    reports: [],
    report: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_MANY_REPORTS:
            return {
                reports: action.payload
            }

        case SAVE_REPORT:
            return {
                report: action.payload
            }

        case CLEAR_REPORT:
            return {
                report: {}
            }

        default:
            return state;
    }
}