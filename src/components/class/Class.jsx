import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Class(props) {
    return (
    <>
        <td>{props.name}</td>
        <td>{props.duration}</td>
        <td>{props.price}</td>
        <td>{props.description}</td>
    </>
    );
}
