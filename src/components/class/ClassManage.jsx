import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

export default function ClassManage() {

    const [usersIn, setUsersIn] = useState()
    const [usersOut, setUsersOut] = useState()
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        loadUsersIn()
        loadUsersOut()
    }, [])

    const loadUsersIn = () =>{
        Axios.get(`/class/users?class=${id}`)
        .then(res =>{
            setUsersIn(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const loadUsersOut = () =>{
        Axios.get(`/class/notUsers?class=${id}`)
        .then(res =>{
            setUsersOut(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const removeUser = (ids) =>{
        console.log(ids)
        Axios.post('/class/removeUser', ids)
        .then(() =>{
            loadUsersIn()
            loadUsersOut()
        })
    }

    const addUser = (ids) =>{
        console.log(ids)
        Axios.get(`/class/enroll?class=${ids.class}&user=${ids.user}`)
        .then(() =>{
            loadUsersIn()
            loadUsersOut()
        })
    }

    console.log(usersIn)
    return (
        <div>
            <h1>ClassManage</h1>
            <h3>Users in class</h3>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {usersIn?.map((user, index) => (
                        <tr key={index}>
                            <td>{user.fullName}</td>
                            <td>
                                <button onClick={() => removeUser({"class": id, "user": user._id})}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Users not in class</h3>
            <table>
                    <tr>
                        <th>Full Name</th>
                        <th>Action</th>
                    </tr>
                <tbody>
                    {usersOut?.map((user, index) => (
                        <tr key={index}>
                            <td>{user.fullName}</td>
                            <td>
                                <button onClick={() => addUser({"class": id, "user": user._id})}>Add</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>        
        </div>
    );
    }
