import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate } from "react-router-dom";

export default function ClassCreate() {
    const[newClass, setNewClass] = useState({})
    const navigate = useNavigate();
    const addClass = (data) =>{
        Axios.post('/class/add', data)
        .then(() =>{
            navigate("/class");
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const handleChange = (event) =>{
        const classToChange = event.target.name;
        const classValue = event.target.value;
        console.log(classToChange)
        if (classToChange === "image") {
            const files = event.target.files;
            setNewClass(prevState => ({
                ...prevState,
                image: files,
            }));
        } else {
            setNewClass(prevState => ({
                ...prevState,
                [classToChange]: classValue
            }));
            console.log(newClass);
        }

        // const updatedClass = {...newClass}
        // updatedClass[classToChange] = classValue;
        // console.log(updatedClass);
        // setNewClass(updatedClass);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(newClass)
        const formData = new FormData();
        Object.keys(newClass).forEach(key => {
            if (key === 'image') {
                console.log("yes")
                for (let i = 0; i < newClass.image.length; i++) {
                    console.log(newClass.image[i]);
                    formData.append('image', newClass.image[i]);
                }
            } else {
                formData.append(key, newClass[key]);
            }
        });
        addClass(formData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                 <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id='name' name='name' onChange={handleChange} required/>
                </div>

               <div>
                    <label htmlFor="duration">Duration:</label>
                    <input type="text" id='duration' name='duration' onChange={handleChange} required/>
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id='price' name='price' onChange={handleChange} required/>
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id='description' name='description' onChange={handleChange} required/>
                </div>

                <div>
                    <label htmlFor="image">Images:</label>
                    <input type="file" id='image' name='image' onChange={handleChange} multiple required/>
                </div>

                <button type='submit'>Add Class</button>
            </form>
        </div>
    )
}
