import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
    SET_ERRORS,
    SET_USER
} from '../reducers/types';
import setAuthToken from '../utils/setAuthToken';

export const registerUserAction = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => {
            console.log('registerUserAction: registration succesfull');
            localStorage.setItem('name', res.data.name);
            history.push('/login');
        }).catch(error => {
            console.log('There was an error', error.response.data);
            // setErrorAction(error.response.data);
            dispatch({
                type: 'SET_ERRORS',
                payload: error.response.data
            });
        })
}


// @param userData = { name, password }
export const loginUserAction = (userData, history) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //Change name in localStorage if needed
            if (userData.name !== localStorage.getItem('name')) {
                console.log('Changing name in localStorage');
                localStorage.setItem('name', userData.name);
            }

            const token = res.data.token;

            // Save token to localStorage
            localStorage.setItem('token', token);
            // Set default Authorization header in axios
            setAuthToken(token);
            // Decode token to get properties (name,id)
            const decoded = jwt_decode(token);
            // dispatch(setCurrentUserAction(decoded));
            const userToSet = {
                name: decoded.name,
                id: decoded.id,
                exp: decoded.exp
            };

            dispatch(setCurrentUserAction(userToSet));
            history.push('/dashboard');
        }).catch(errors => {
            dispatch({
                type: SET_ERRORS,
                payload: errors.response.data
            })
        })
}

export const setCurrentUserAction = (userData) => {
    return {
        type: SET_USER,
        payload: userData
    };
}

export const logoutUserAction = () => {
    localStorage.removeItem('token');
    setAuthToken(false);
    return {
        type: SET_USER,
        payload: {}
    }
}