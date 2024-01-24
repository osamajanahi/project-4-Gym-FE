import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Class(props) {
    return (
<div className="col mb-4">
  <div className="card shadow-sm" style={{ width: '18rem' }}>
    <img src={props.image[0]} className="card-img-top" alt="carImage" style={{ height: '250px' }} />
    <div className="card-body">
      <h5 className="card-title">{props.name}</h5>
      <div className="d-flex justify-content-between">
        <Link to={`/class/view/${props._id}`} className="btn btn-outline-primary mb-2">View</Link>

        {props.userType === 'admin' && (
          <>
            <Link to={`/class/edit/${props._id}`} className="btn btn-outline-primary mb-2">Edit</Link>
            <button onClick={() => props.deleteClass(props._id)} className="btn btn-outline-danger mb-2">Delete</button>
            <Link to={`/class/manage/${props._id}`} className="btn btn-outline-primary mb-2">Manage</Link>
          </>
        )}
      </div>
    </div>
  </div>
</div>

    );
}
