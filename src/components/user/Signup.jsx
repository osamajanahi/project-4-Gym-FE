import React, { useState } from 'react'

export default function Signup(props) {

    const [newUser, setNewUser] = useState({});

    const handleChange = (e) =>{
        const user = {...newUser};
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const registerHandler = (e) =>{
        e.preventDefault();
        props.register(newUser);
        e.target.reset();
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={registerHandler}>
                <div>
                    <label>Full Name</label>
                    <input type="text" name='fullName' onChange={handleChange} className='form-control'/>
                </div>
                <div>
                    <label>Email Address</label>
                    <input type="text" name='email' onChange={handleChange} className='form-control'/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name='password' onChange={handleChange} className='form-control'/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="number" name='phone' onChange={handleChange} className='form-control'/>
                </div>
                <div>
                    <input type='submit' value='Register' className='btn btn-primary'></input>
                </div>
            </form>
        </div>
    )
}
