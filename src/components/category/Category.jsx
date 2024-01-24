import React from 'react'
import { Link } from 'react-router-dom';

export default function Category(props) {
    return (
        <div>
            <p>Category Name: {props.name}</p>
            <img src={props.image} alt="category image" height={100} width={100} />
            <br />
            <Link to={`/category/edit/${props._id}`}>
                <button type="button" className="btn btn-outline-primary mb-2">Edit</button>
            </Link>
            <Link to={`/category/view/${props._id}`}>View</Link>

            <hr />
        </div>
    )
}
