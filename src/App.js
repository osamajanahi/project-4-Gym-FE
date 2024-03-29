import React, { useEffect, useState } from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import {Routes, Route} from 'react-router-dom';
import Axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import NavBar from './components/home/NavBar';
import Home from './components/home/Home';
import ClassList from './components/class/ClassList';
import ClassEdit from './components/class/ClassEdit';
import ClassCreate from './components/class/ClassCreate';
import ClassDetail from './components/class/ClassDetail';
import ClassManage from './components/class/ClassManage';
import MyClassesList from './components/myClass/MyClassesList';
import CategoryList from './components/category/CategoryList';
import CategoryEdit from './components/category/CategoryEdit';
import CategoryCreate from './components/category/CategoryCreate';
import CategoryDetail from './components/category/CategoryDetail';

function App() {
  const[isAuth, setIsAuth] = useState(false);
  const[user, setUser] = useState({});

  useEffect(() =>{ 
    const user = getUser();
    // console.log(user);
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
  // console.log(user.id)
  return (
    <div className="App">
      {isAuth ? <NavBar key={user.id} isAuth={isAuth} onLogoutHandler={onLogoutHandler} userId={user.id} />
      :
      <NavBar isAuth={isAuth} onLogoutHandler={onLogoutHandler}/>
}
      <div>
      <Routes>
        <Route path="/" element={ <Home isAuth={isAuth}/>}></Route>
        <Route path="/class" element={isAuth ? <ClassList userId={user.id} key={user.id} isAuth={isAuth} /> : <ClassList/>}></Route>
        <Route path="/signup" element={<Signup register={registerHandler}></Signup>}></Route>
        <Route path="/signin" element={ isAuth ? <Home isAuth={isAuth}/> : <Signin login={loginHandler}></Signin>}></Route>
        <Route path='/class/add' element={<ClassCreate />}></Route>
        <Route path="/class/edit/:id" element={<ClassEdit/>}></Route>
        <Route path="/class/view/:id" element={ isAuth ? <ClassDetail key={user.id} userId={user.id}/> : <ClassDetail/>}></Route>
        <Route path="/class/manage/:id" element={<ClassManage/>}></Route>
        <Route path="/myClasses" element={isAuth ? <MyClassesList key={user.id} userId={user.id}/> : <MyClassesList/>}></Route>
        <Route path="/category" element={isAuth ? <CategoryList userId={user.id} key={user.id} isAuth={isAuth} /> : <CategoryList/>}></Route>
        <Route path='/category/edit/:id' element={<CategoryEdit/>}/>
        <Route path='/category/add' element={<CategoryCreate/>}></Route>
        <Route path="/category/view/:id" element={<CategoryDetail/>}></Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
