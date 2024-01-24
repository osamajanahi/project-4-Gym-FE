import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Class from './Class';

export default function ClassList() {
    const [classes, setClasses] = useState([]);

    useEffect(() =>{
        loadClasses()
    }, [])

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
            <Class {...cls} deleteClass={deleteClass}/>
        </tr>
    ))

    return (
        <div>
            <Link to={'/class/add'}>Add</Link>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Manage</th>
                </tr>
                {allClasses}
            </table>
        </div>
    )
}
