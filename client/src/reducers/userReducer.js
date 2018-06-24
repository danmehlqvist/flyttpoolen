import isEmpty from '../utils/isEmpty';

import {
    SET_USER
} from './types';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {


    switch (action.type) {
        case SET_USER:
            return {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
}