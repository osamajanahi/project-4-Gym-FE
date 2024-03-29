import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate } from "react-router-dom";

export default function ClassCreate() {
    const[newClass, setNewClass] = useState({})
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        Axios.get("/category")
            .then(response => {
                setCategories(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const allCategories = categories.map((cate) => (
        <option key={cate._id} value={cate._id}>
            {cate.name}
        </option>
    ));

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
                    <input className='form-control' type="text" id='name' name='name' onChange={handleChange} required/>
                </div>

               <div>
                    <label htmlFor="duration">Duration:</label>
                    <input className='form-control' type="text" id='duration' name='duration' onChange={handleChange} required/>
                </div>

                <div>
                    <label htmlFor="days">Days:</label>
                    <input className='form-control' type="text" id='days' name='days' onChange={handleChange} required/>
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input className='form-control'type="number" id='price' name='price' onChange={handleChange} required/>
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <input className='form-control' type="text" id='description' name='description' onChange={handleChange} required/>
                </div>

                <div>
                    <label htmlFor="image">Images:</label>
                    <input className='form-control'type="file" id='image' name='image' onChange={handleChange} multiple required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category:</label>
                    <select className="form-select" id="category" name="category" onChange={handleChange} required>
                        <option value="">Select a Category</option>
                        {allCategories}
                    </select>
                </div>

                <button className='btn btn-outline-primary' type='submit'>Add Class</button>
            </form>
        </div>
    )
}
