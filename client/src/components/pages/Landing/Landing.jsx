import { connect } from 'react-redux';

import React from 'react'

import './Landing.css';

class Landing extends React.Component {
  render() {
    return (
      <div className="Landing">
        <button
          className="big"
          onClick={
            () => {
              this.props.history.push('/login');
            }
          }
        >Logga In!</button>

        <button
        className="big"
          onClick={
            () => {
              this.props.history.push('/register');
            }
          }
        >Ny användare!</button>
      </div >
    )
  }

  newUserClick = () => {
    this.props.history.push('/register');
  }

  componentWillMount() {
    if (this.props.user.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Landing);
