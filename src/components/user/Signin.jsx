import React from 'react'
import { useState } from 'react';
export default function Signin(props) {
    const [newUser, setNewUser] = useState({});

    const handleChange = (e) =>{
        const user = {...newUser};
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const loginHandler = (e) =>{
        e.preventDefault();
        props.login(newUser);
        e.target.reset();
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={loginHandler}>
                <div>
                    <label>Email Address</label>
                    <input type="text" name='email' onChange={handleChange} className='form-control'/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name='password' onChange={handleChange} className='form-control'/>
                </div>
                <div>
                    <input type='submit' value='Login' className='btn btn-primary'></input>
                </div>
            </form>
        </div>
    )
}
