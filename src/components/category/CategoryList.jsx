import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Category from './Category';
import { Link } from 'react-router-dom';

export default function CategoryList(props) {
    const [userType,setUserType] = useState();

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCategoryList();
        usertype()

    }, []);

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
            <Category {...category} userType={userType}/>
        </div>
    ));

    return (
        <div className="container mt-4">
            <div>
                <div className='postHead d-flex justify-content-between align-items-center'>
                    <h1>Categories</h1>
                    {userType == "admin" &&<Link to={'/category/add'} className="btn btn-primary">Add Category</Link>}
                </div>
            </div>
            <div class="mx-auto row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            {allCategories}
            </div>
        </div>
    )
}
