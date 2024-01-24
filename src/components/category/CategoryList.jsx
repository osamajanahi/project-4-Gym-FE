import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Category from './Category';
import { Link } from 'react-router-dom';

export default function CategoryList() {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCategoryList();
    }, []);

    const loadCategoryList = () => {
        Axios.get("category")
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    setError("Categories data is not in expected format or undefined");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load categories.");
            });
    };

    const allCategories = categories.map((category, index) => (
        <div key={index}>
            <Category {...category} />
        </div>
    ));

    return (
        <div>
            <h1>CategoryList</h1>
            <Link to={'/category/add'}>Add</Link>
            {allCategories}
        </div>
    )
}
