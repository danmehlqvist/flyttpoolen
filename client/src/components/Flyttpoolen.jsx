import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './Flyttpoolen.css';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUserAction, logoutUserAction } from '../actions/userActions';

import Header from './Navigation/Header';
import Landing from './pages/Landing/Landing';
import RegisterNewUser from './pages/RegisterNewUser/RegisterNewUser';
import Login from './pages/Login/Login';
import CreateEntry from './pages/CreateEntry/CreateEntry';
import PrivateRoute from './common/PrivateRoute';
import UserStatusBar from './Navigation/UserStatusBar';
import Dashboard from './pages/Dashboard/Dashboard';
import JobReported from './JobReported';
import DisplaySingleReport from './pages/Dashboard/DisplaySingleReport/DisplaySingleReport';


class Flyttpoolen extends React.Component {

    render() {

        // Check for token
        if (localStorage.token) {
            //Set auth header token for axios requests
            setAuthToken(localStorage.token);
            const decoded = jwt_decode(localStorage.token);
            // Set user
            store.dispatch(setCurrentUserAction(decoded));
            // Check for expired token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                // Logout user
                store.dispatch(logoutUserAction());
                window.location.href = "/login";
            }
        }

        return (
            <Provider store={store}>
                <div className="Flyttpoolen">
                    <BrowserRouter>
                        <div>
                            <Header />
                            <UserStatusBar />
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/register" component={RegisterNewUser} />
                            <Route exact path="/login" component={Login} />
                            <Switch>
                                <PrivateRoute exact path="/create-entry" component={CreateEntry} />
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/job-reported" component={JobReported} />
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/display-single-report" component={DisplaySingleReport} />
                            </Switch>

                        </div>
                    </BrowserRouter>

                </div>
            </Provider >
        )
    }
};

export default Flyttpoolen;
