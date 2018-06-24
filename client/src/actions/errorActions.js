import {
    SET_ERRORS
} from '../reducers/types';


export const setErrorAction = errors => dispatch => {
    console.log('setErrorAction', errors);
    dispatch({
        type: SET_ERRORS,
        payload: errors
    })
};