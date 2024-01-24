import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Class from './Class';

export default function ClassList(props) {
    const [classes, setClasses] = useState([]);
    const [userType,setUserType] = useState();

    useEffect(() =>{
        loadClasses()
        usertype()
    }, [])

const usertype = async () =>{
    if (!props.isAuth) return;
    console.log(props)
    await Axios.get(`/user/userType?id=${props.userId}`)
    .then((res) => {
        console.log(res.data.user.type);
        setUserType(res.data.user.type);
    })
    .catch((err) => {
        console.log(err);
    });
}

    const loadClasses = () =>{
        Axios.get('class')
        .then(response =>{
            // console.log(response);
            setClasses(response.data)
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const deleteClass = (id)=>{
        console.log(id)
        Axios.post('/class/delete', {"_id":id})
        .then(()=>{
            loadClasses();
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const allClasses = classes.map((cls, index) =>(
        <tr key={index}>
            <Class {...cls} deleteClass={deleteClass} userType = {userType}/>
        </tr>
    ))

    return (
        <div className="container mt-4">
            <div>
                <div className='postHead d-flex justify-content-between align-items-center'>
                    <h1>All Classes</h1>
                    {userType == "admin" &&<Link to={'/class/add'} className="btn btn-primary">Add</Link>}
                </div>
            </div>
            <div class="mx-auto row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                {allClasses}
            </div>
        </div>
    )
}
