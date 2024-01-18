import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
export default function ClassDetail() {

    const [classes, setClasses] = useState({});
    const { id } = useParams();
    useEffect(() =>{
        loadClasses(id)
    },{})

    const loadClasses = (id) =>{
        Axios.get(`/class/edit?id=${id}`)
        .then(res =>{
            setClasses(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    return (
        <div>
            <h1>ClassDetail</h1>
                <h3>Class: {classes.name}</h3>
                <h3>Duration: {classes.duration}</h3>
                <h3>Price: {classes.price}</h3>
                <h3>Description: {classes.description}</h3>
                <h3>Images:</h3>
                {classes.image?.map((image, index) => (
                    <img key={index} src={image} alt='class image' />
                ))}
        </div>
    )
}
