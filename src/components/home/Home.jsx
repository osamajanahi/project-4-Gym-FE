import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link to='/class'>Class</Link>
        </div>
    )
}
