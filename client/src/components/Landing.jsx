import {connect} from 'react-redux';

// This file will present the user to a login/register screen if no token is available


import React from 'react'

import BigButton from './common/BigButton';

import './Landing.css';

class Landing extends React.Component {
  render() {
    return (
      <div className="Landing">
        <BigButton
          buttonText="Logga in!"
          onClick={
            () => {
              this.props.history.push('/login');
            }
          }
        />

        <BigButton
          buttonText="Ny användare!"
          onClick={
            () => {
              this.props.history.push('/register');
            }
          }
        />
      </div >
    )
  }

  newUserClick = () => {
    this.props.history.push('/register');
  }

  componentWillMount() {
    console.log('Landing component is mounted');
    if (this.props.user.isAuthenticated){
      this.props.history.push('/create-entry');
    }
  }

}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Landing);
