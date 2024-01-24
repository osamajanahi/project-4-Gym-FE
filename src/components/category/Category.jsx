import React from 'react'
import { Link } from 'react-router-dom';

export default function Category(props) {
    return (
        <div className="col mb-4">
  <div className="card shadow-sm" style={{ width: '18rem' }}>
  {/* <img src={props.image} alt="category image" height={100} width={100} /> */}
  <img src={props.image} className="card-img-top" alt="carImage" style={{ height: '250px' }} />

    <div className="card-body">
      <h5 className="card-title">{props.name}</h5>

      <div className="d-flex justify-content-between">
      <Link className="btn btn-outline-primary mb-2" to={`/category/view/${props._id}`}>View</Link>

        {props.userType === 'admin' && (
            <Link to={`/category/edit/${props._id}`}>
                {props.userType == 'admin' && <button type="button" className="btn btn-outline-primary mb-2">Edit</button>}
            </Link>
        )}
      </div>
    </div>
  </div>
</div>

        // <div>
        //     <p>Category Name: {props.name}</p>
        //     <img src={props.image} alt="category image" height={100} width={100} />
        //     <br />
        //     <Link to={`/category/edit/${props._id}`}>
        //         {props.userType == 'admin' && <button type="button" className="btn btn-outline-primary mb-2">Edit</button>}
        //     </Link>
        //     <Link to={`/category/view/${props._id}`}>View</Link>

        //     <hr />
        // </div>
    )
}
