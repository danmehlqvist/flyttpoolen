import React from 'react'
import moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './WorkTableEntry.css';
import { loadReportToStateAction } from '../../actions/reportActions';


library.add(faInfoCircle);

class WorkTableEntry extends React.Component {

    onClick = e => {
        this.props.loadReportToStateAction(this.props.data);
        this.props.history.push('/display-single-report');
    }

    render() {

        if (!this.props.data) {
            return (
                <tr>
                    <td></td>
                    <td>loading...</td>
                    <td></td>
                    <td></td>
                </tr>
            )
        } else {
            return (
                <tr className="WorkTableEntry">
                    <td>{moment(this.props.data.date).format('YYYY-MM-DD')}</td>
                    <td>{this.props.data.hours}</td>
                    <td>{this.props.data.customer.length > 10 ? this.props.data.customer.substring(0, 10) + '...' : this.props.data.customer}</td>
                    <td className="icon" ><FontAwesomeIcon onClick={this.onClick} icon="info-circle" /></td>
                </tr>
            )
        }
    }

}


export default connect(null , { loadReportToStateAction })(withRouter(WorkTableEntry));