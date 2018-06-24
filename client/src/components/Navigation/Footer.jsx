import React from 'react'
import { connect } from 'react-redux';

import './Footer.css';
import { logoutUserAction } from '../../actions/userActions';


import BigButton from '../common/BigButton';

class Footer extends React.Component {
    render() {
        return (
            <div className="Footer">
                <div className="button">
                    <BigButton
                        buttonText="Logga ut"
                        onClick={this.onClick}
                    />
                </div>
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

export default connect(mapStateToProps, { logoutUserAction })(Footer);

