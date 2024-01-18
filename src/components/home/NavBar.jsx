import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function NavBar({isAuth, onLogoutHandler}) {
    return (
        <div>
            <nav>
                {isAuth ?
                    (
                        <div>
                            <Link to="/">Home</Link> &nbsp;
                            <Link to="/logout" onClick={onLogoutHandler}>Logout</Link>
                        </div>
                    ) :
                    (
                        <div>
                            <Link to="/">Home</Link> &nbsp;
                            <Link to="/signup">Signup</Link> &nbsp;
                            <Link to ="signin">Singin</Link>&nbsp;
                        </div>
                    )
                }
            </nav>
        </div>
    )
}
