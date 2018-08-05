import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './RegisterNewUser.css';
import { registerUserAction } from '../../../actions/userActions';

import TextFieldInput from '../../common/TextFieldInput';

class Register extends Component {

    state = {
        name: '',
        password: '',
        password2: '',
        errors: {}
    };

    render() {

        return (
            <div className="RegisterNewUser">
                <h1>Registrera ny användare</h1>
                <form onSubmit={this.onSubmit}>

                    <TextFieldInput
                        label="Önskat användarnamn"
                        type="text"
                        info="Minst 4 tecken"
                        value={this.state.name}
                        onChange={this.onChange}
                        name="name"
                        error={this.state.errors.name}
                    />

                    <TextFieldInput
                        label="Önskat lösenord"
                        type="password"
                        info="Minimum 4 tecken"
                        value={this.state.password}
                        onChange={this.onChange}
                        name="password"
                        error={this.state.errors.password}
                    />

                    <TextFieldInput
                        label="Bekräfta lösenord"
                        type="password"
                        value={this.state.password2}
                        onChange={this.onChange}
                        name="password2"
                        error={this.state.errors.password2}
                    />



                    <button className="small" onClick={this.onSubmit}>
                        Skicka</button>




                    <button className="small"
                        onClick={() => {
                            this.setState(() => ({
                                name: '',
                                password: '',
                                password2: '',
                                errors: {}
                            }));
                        }}
                    >Rensa</button>

                    <Link to="/" className="small">Tillbaka</Link>

                    <input style={{ display: "none" }} type="submit" />
                </form>
            </div>
        )
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(() => ({ [name]: value }));
    }

    onSubmit = e => {
        e.preventDefault();
        console.log('onSubmit');

        const errors = {};
        // Validation for name
        if (this.state.name.trim().length === 0) {
            errors.name = "Skriv in namnet, din idiot!"
        } else if (this.state.name.length < 3) {
            errors.name = "Minst 3 bokstäver för i helvete"
        } else if (this.state.name.length > 30) {
            errors.name = "Välj ett kortare namn"
        }
        // Validation for password
        if (this.state.password.length === 0) {
            errors.password = "Skriv in ett lösenord, din idiot!"
        } else if (this.state.password.length < 4) {
            errors.password = "Minst 4 bokstäver för i helvete"
        }
        // Validation for password2
        if (this.state.password !== this.state.password2) {
            errors.password2 = 'Lösenorden är inte lika'
        }

        if (Object.keys(errors).length === 0) { // Everything worked out!
            this.setState(() => ({
                errors: {}
            }));
            const newUser = {
                name: this.state.name,
                password: this.state.password,
                password2: this.state.password2
            };
            this.props.registerUserAction(newUser, this.props.history);
        } else {
            console.log(errors);
            this.setState(() => ({
                errors
            }))
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            console.log('Updating local state with errors');
            this.setState(() => ({
                errors: nextProps.errors
            }));
        }
    }

}

const mapStateToProps = state => ({
    errors: state.errors
});

Register.propTypes = {
    registerUserAction: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { registerUserAction })(Register);