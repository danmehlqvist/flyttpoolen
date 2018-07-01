import React, { Component } from 'react'
import { connect } from 'react-redux';

import './UserStatusBar.css';
import { logoutUserAction } from '../../actions/userActions';

class UserStatusBar extends Component {
    render() {

        let renderJsx;

        if (this.props.user.isAuthenticated) {
            renderJsx = (
                <div className="grid">
                    <div className="name">
                        Inloggad som {this.props.user.user.name}
                    </div>
                    <div className="logout">
                        <button className="small" onClick={this.onClick}>Logga ut</button>
                    </div>
                </div>
            )
        }

        return (
            <div className="UserStatusBar">
                {renderJsx}
            </div>
        )
    }
    onClick = e => {
        this.props.logoutUserAction();
    }
}


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { logoutUserAction })(UserStatusBar);
