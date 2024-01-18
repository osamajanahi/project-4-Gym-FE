import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Class(props) {
    return (
    <>
        <td>{props.name}</td>
        <td>{props.duration}</td>
        <td>{props.price}</td>
        <td>{props.description}</td>
        <td><Link to={`/class/view/${props._id}`}>View</Link></td>
        <td><Link to={`/class/edit/${props._id}`}>Edit</Link></td>
        <td><button onClick={() => props.deleteClass(props._id)}>Delete</button></td>
        <td><Link to={`/class/manage/${props._id}`}>Manage</Link></td>
    </>
    );
}
