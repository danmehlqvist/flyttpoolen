import { connect } from 'react-redux';

import React from 'react'
import {Link} from 'react-router-dom';

import './Landing.css';

class Landing extends React.Component {
  render() {
    return (
      <div className="Landing">
        <Link to="/login" className="big">Logga In</Link>
        <br />
        <Link to="/register" className="big">Ny användare</Link>

      </div >
    )
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
