import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CategoryEdit() {
    const navigate = useNavigate();
    const [category, setCategory] = useState({ name: '', image: null });
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadCategory(id);
        }
    }, [id]);

    const loadCategory = (id) => {
        console.log(id)
        Axios.get(`/category/edit?id=${id}`) // Make sure this matches your API endpoint
            .then(response => {
                console.log(response.data)
                    setCategory(response.data);
            })
            .catch(err => {
                console.log("Error loading category information", err);
            });
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setCategory(prevCategory => ({
            ...prevCategory,
            [name]: files ? files[0] : value
        }));
        console.log(category)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(category).forEach(key => {
            if (key === 'image') {
                    formData.append('image', category.image);
            } else if (key !== 'class') {
                formData.append(key, category[key]);
            }
        });

        Axios.post(`/category/edit`, formData)
            .then(() => {
                navigate('/category');
            })
            .catch(err => {
                console.log("Error updating category", err);
            });
    };
console.log(category)
        return (
        <div className="container mt-4">
            <h1>Category Edit</h1>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        onChange={handleChange} 
                        value={category.name || ''}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        id="image" 
                        name="image" 
                        onChange={handleChange}
                    />
                    {category.image && !(category.image instanceof File) && (
                        <div className="mt-2">
                            <p>Current Image:</p>
                            <img src={category.image} alt="Category" style={{ width: '100px', height: '100px' }}/>
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Edit Category</button>
            </form>
        </div>
    );
}
