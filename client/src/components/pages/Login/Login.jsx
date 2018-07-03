import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

import './Login.css';
import { loginUserAction } from '../../../actions/userActions';

import TextFieldInput from '../../common/TextFieldInput';

class Login extends Component {

    state = {
        name: '',
        password: '',
        errors: {}
    }

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={this.onSubmit}>
                    <TextFieldInput
                        label="Användarnamn"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        error={this.state.errors.name}
                    />
                    <TextFieldInput
                        label="Lösenord"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={this.state.errors.password}
                    />
                    <button
                        className="big"
                        onClick={this.onSubmit}
                    >Logga In</button>
                    <button
                        className="big"
                        onClick={() => {
                            this.props.history.push('/');
                        }}
                    >Avbryt</button>
                    <input type="submit" style={{ display: "none" }} />
                </form>
            </div>
        )
    }

    onSubmit = e => {
        e.preventDefault();
        const errors = {};
        //Some basic validation before sending to server
        if (this.state.name.length < 3) {
            errors.name = 'Minst tre tecken'
        }
        if (this.state.password.length < 4) {
            errors.password = 'Minst fyra tecken'
        }
        this.setState(() => ({ errors }))

        if (Object.keys(errors).length === 0) {  // Basic local validation succeeded. Proceed to server!
            // Check if localStorage name has been changed

            this.props.loginUserAction({
                name: this.state.name,
                password: this.state.password
            }, this.props.history);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({
            errors: nextProps.errors
        }));
    }

    componentWillMount() {
        if (this.props.user.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        const username = localStorage.getItem('name');
        if (username) {
            this.setState(() => ({ name: username }))
        }
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState(() => ({
            [name]: value
        }))
    }
}

Login.propTypes = {
    errors: PropType.object.isRequired,
    loginUserAction: PropType.func.isRequired,
    user: PropType.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    user: state.user
})

export default connect(mapStateToProps, { loginUserAction })(Login);