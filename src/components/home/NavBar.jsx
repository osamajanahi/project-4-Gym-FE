import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function NavBar({isAuth, onLogoutHandler, userId}) {
    // useEffect(() =>{
    //     usertype()
    // }, [])
 
    
    // const usertype = async () =>{
    //     // if (!isAuth) return;
    //     await Axios.get(`/user/userType?id=${userId}`)
    //     .then((res) => {
    //     console.log(res.data.user);
    //     setUserImage(res.data.user.image);
    //     })
    //     .catch((err) => {
    //     console.log(err);
    //     });
    
    // }

    return (
<div className='navEdit'>
  <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-black">
      <div className="container-fluid d-flex justify-content-between align-items-center px-5">
        <Link className='navbar-brand' to='/'>
          <img src="http://res.cloudinary.com/dbk40zyi7/image/upload/v1706124943/n6j8lze3l1m4krzfyphw.png" alt="logo" height={50} width={100} />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          {isAuth ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active"><Link className="nav-link active" to="/">Home</Link></li>
              <li className="nav-item active"><Link className="nav-link active" to="/class">Class</Link></li>
              <li className="nav-item active"><Link className="nav-link active" to="/category">Category</Link></li>
              <li className="nav-item active"><Link className="nav-link active" to="/myClasses">My Classes</Link></li>
              <li className="nav-item active"><Link className="nav-link active" to="/logout" onClick={onLogoutHandler}>Logout</Link></li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active"><Link className="nav-link active" to="/">Home</Link></li>
              <li className="nav-item active"><Link className="nav-link active" to="/class">Class</Link></li>
              <li className="nav-item active"><Link className="nav-link active" to="/category">Category</Link></li>
              <li className="nav-item active"><Link className="nav-link active" to="/signup">Signup</Link></li>
              <li className="nav-item active"><Link className="nav-link active" to="signin">Signin</Link></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  </header>
</div>

    )
}
