import React from 'react'

export default function MyClasses(props) {
    console.log(props.class.name)
    return (
        <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Class Information</h5>
            <p className="card-text">Class Name: {props.class.name}</p>
            <p className="card-text">Starting Date: {props.startDate.split('T')[0]}</p>
            <p className="card-text">Ending Date: {props.endDate.split('T')[0]}</p>
            <p className='card-text'>Time: {props.class.duration}</p>
            <p className='card-text'>Price: {props.class.price}BD</p>
          </div>
        </div>
      </div>
  )
}
