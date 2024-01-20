import React from 'react'

export default function MyClasses(props) {
    return (
        <div>
            <p>Class Name: {props.class.name}</p>
            <p>Starting Date: {props.startDate.split('T')[0]}</p>
            <p>Ending Date: {props.endDate.split('T')[0]}</p>
            <hr />
        </div>
    )
}
