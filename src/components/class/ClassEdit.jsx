import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

export default function ClassEdit() {
    const [classes, setClasses] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        editVew(id)
    },[])

    const editVew = (id) =>{
        Axios.get(`/class/edit?id=${id}`)
        .then(res =>{
            // console.log(res.data);
            const classData = res.data;
            setClasses(classData);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const updateClass = (data)=>{
        console.log(data)
        Axios.post('/class/edit', data)
        .then(() =>{
            // console.log('in')
            navigate('/class')
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const handleChange = (event) =>{
        const classToChange = event.target.name;
        const classValue = event.target.value;
        const updatedClass = {...classes};
        updatedClass[classToChange] = classValue;
        console.log(updatedClass);
        setClasses(updatedClass);
    }

    const handleSubmit = (event) =>{
        // console.log(classes)
        event.preventDefault();
        updateClass(classes);
    }

    return (
        <div>
            <h1>ClassEdit</h1>
            <form onSubmit={handleSubmit}>
                 <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id='name' name='name' onChange={handleChange} value={classes.name || ''} required/>
                </div>

               <div>
                    <label htmlFor="duration">Duration:</label>
                    <input type="text" id='duration' name='duration' onChange={handleChange} value={classes.duration || ''} required/>
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id='price'name='price' onChange={handleChange} value={classes.price || ''} required/>
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id='description'name='description' onChange={handleChange} value={classes.description || ''} required/>
                </div>

                <div>
                    <p>Current Images:</p>
                    {classes.image?.map((image, index) => (
                        <img key={index} src={image} height={200} width={200} alt='class image' />
                    ))}
                </div>

                <button type='submit'>Update Class</button>
            </form>
        </div>
    )
}
