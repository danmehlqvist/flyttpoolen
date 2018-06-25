import {
    combineReducers
} from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import reportReducer from './reportReducer';


export default combineReducers({
    user: userReducer,
    errors: errorReducer,
    reports: reportReducer
})