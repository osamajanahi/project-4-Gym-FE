import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Index from './components/new/Index';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import {Routes, Route, Link} from 'react-router-dom';
import Axios from 'axios';
import {jwtDecode} from 'jwt-decode';

function App() {
  const[isAuth, setIsAuth] = useState(false);
  const[user, setUser] = useState({});

  useEffect(() =>{ 
    const user = getUser();
    console.log(user);
    if(user){
      setIsAuth(true)
      setUser(user)
    }
    else{
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser(null);
    }
  }, [])

  const registerHandler = (user) =>{
    console.log(user)
    Axios.post("auth/signup", user)
    .then(res =>{
      console.log(res);
    })
    .catch(err =>{
      console.log(err);
    })
  }

  const loginHandler = (cred) =>{
    Axios.post("auth/signin", cred)
    .then(res =>{
      console.log(res.data.token);
      let token = res.data.token;

      if(token != null){
      localStorage.setItem("token", token);
      const user = getUser();
      console.log(user);
      user ? setIsAuth(true) : setIsAuth(false);
      user ? setUser(user) : setUser(null)
      }
    })
    .catch(err =>{
      console.log(err);
      setIsAuth(false);
      setUser(false);
    })
  }

  const getUser = () =>{
    const token = getToken();
    return token ? jwtDecode(token).user : null;
  }

  const getToken = () =>{
    const token = localStorage.getItem("token");
    return token;
  }

  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  }
  return (
    <div className="App">
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
      <div>
      <Routes>
        <Route path="/" element={ isAuth ? <Index/> : <Signin login={loginHandler}></Signin>}></Route>
        <Route path="/signup" element={<Signup register={registerHandler}></Signup>}></Route>
        <Route path="/signin" element={ isAuth ? <Index/> : <Signin login={loginHandler}></Signin>}></Route>
      </Routes>
      </div>

    </div>
  );
}

export default App;
