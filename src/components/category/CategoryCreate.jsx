import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CategoryCreate() {
    const navigate = useNavigate();
    const [newCategory, setNewCategory] = useState({});

    const addCategory = (category) => {
        Axios.post("/category/add", category)
        .then(res => {
            console.log("Category Added successfully!!!");
            navigate('/category');
        })
        .catch(err => {
            console.log("Error adding Category");
            console.log(err);
        });
    };

    const handleChange = (event) => {
        const attributeToChange = event.target.name;
        let newValue = event.target.value;

        if(attributeToChange === "image"){
            const file = event.target.files[0];
            setNewCategory(prevState => ({
                ...prevState,
                [attributeToChange]: file
            }));
        } else {
            setNewCategory(prevState => ({
                ...prevState,
                [attributeToChange]: newValue
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        Object.keys(newCategory).forEach(key => {
            formData.append(key, newCategory[key]);
        });

        addCategory(formData);
    };

    return (
        <div className="container mt-4">
            <h1>Create Category</h1>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input type="file" className="form-control" id="image" name="image" onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Add Category</button>
            </form>
        </div>
    );
}
