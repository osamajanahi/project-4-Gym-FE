import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home({isAuth}) {
    return (
        <div>
            <h1>Home</h1>
            {console.log(isAuth)}
            {isAuth &&
                <Link to='/class'>Class</Link>
            }
            <br />
            {isAuth &&
                <Link to='/myClasses'>My Classes</Link>
            }


        </div>
    )
}
