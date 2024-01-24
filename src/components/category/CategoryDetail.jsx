import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function CategoryDetail() {
    const [classes, setClasses] = useState([]);
    const [cat, setCat] = useState();
    const { id } = useParams();
    useEffect(() => {
        getClasses();
    }, [id]);
    const getClasses = () =>{
        console.log(id)
        Axios.get(`/category/detail?id=${id}`)
            .then(response => {
                setCat(response.data.category)
                setClasses(response.data.category.class);
            })
            .catch(err => {
                console.error(err);
            });
        }
        // Fetch category details
        // Axios.get(`http://localhost:3050/category/detail?id=${categoryId}`)
        //     .then(response => {
        //         setCategory(response.data.category);
        //     })
        //     .catch(err => {
        //         console.error(err);
        //         setError("Failed to load category details.");
        //     });


    return (
        <div className="container mt-4">
            <h1>{cat.name}</h1>
            <div className="row">
                {console.log(classes)}
                {classes.map(classe => (
                    <div key={classe._id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            {classe.image && <img src={classe.image[0]} className="card-img-top" alt="classes" style={{ height: '250px' }} />}
                            <div className="card-body">
                                <h5 className="card-title">{classe.name}</h5>
                                {/* Additional classes details */}
                                <Link to={`/class/view/${classe._id}`} className="btn btn-outline-primary">View</Link>
                                {/* <button className="btn btn-outline-primary" onClick={() => addToWishlist(classes._id)}>Wishlist</button> */}

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
