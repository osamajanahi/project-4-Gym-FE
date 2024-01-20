import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
export default function ClassDetail(props) {

    const [classes, setClasses] = useState({});
    const navigate = useNavigate();
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

    const addUser = (ids) =>{
        console.log(ids)
        Axios.get(`/class/enroll?class=${ids.class}&user=${ids.user}`)
        .then(() =>{
            navigate('/class')
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
                    <img key={index} src={image} alt='class image' height={100} width={100}/>
                ))}
                <br />
                <button onClick={() => addUser({"class": classes._id, "user": props.userId})}>Enroll</button>
        </div>
    )
}
