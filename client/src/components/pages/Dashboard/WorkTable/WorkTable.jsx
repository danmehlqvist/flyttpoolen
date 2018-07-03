import React from 'react'

import './WorkTable.css';

import WorkTableEntry from './WorkTableEntry/WorkTableEntry';
export default (props) => {

    const compare = (a, b) => {
        return b.date - a.date;
    }

    return (

        <table className="WorkTable">
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Timmar</th>
                    <th>Kund</th>
                </tr>
            </thead>
            <tbody>
                {props.data && props.data.sort(compare).map(entry => (
                    <WorkTableEntry
                        data={entry}
                        key={entry._id}
                    />
                ))}
            </tbody>
        </table>


    )
}
