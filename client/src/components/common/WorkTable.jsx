import React from 'react'

import './WorkTable.css';

import WorkTableEntry from './WorkTableEntry';
// props.data
export default (props) => {


    const compare = (a, b) => {
        return b.date - a.date;
    }

    // let renderTableBody;
    // if (Object.keys(props.data).length===0){
    //     renderTableBody='';
    // } else 

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
