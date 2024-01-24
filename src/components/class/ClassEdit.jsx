import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

export default function ClassEdit() {
    const [categories, setCategories] = useState([]);
    const [classes, setClasses] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        editVew(id)
        loadCategories();
    },[id])

    const loadCategories = () => {
        Axios.get("/category")
            .then(response => {
                setCategories(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const allCategories = categories.map((cate) => (
        <option key={cate._id} value={cate._id} selected={classes.category === cate._id}>
            {cate.name}
        </option>
    ));

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
        const logFormData = (data) => {
            for (const entry of data.entries()) {
              console.log(entry);
            }
          };
          
        //   Assuming formData is your FormData object
          logFormData(data);

        Axios.post('/class/edit', data)
        .then(() =>{
            console.log('in')
            navigate('/class')
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const handleChange = (event) =>{
        const { name, value, files } = event.target;
        setClasses(prevClass => ({
            ...prevClass,
            [name]: files ? files : value
        }));


        // const classToChange = event.target.name;
        // const classValue = event.target.value;
        // const updatedClass = {...classes};
        // updatedClass[classToChange] = classValue;
        // console.log(updatedClass);
        // setClasses(updatedClass);
    }

    const handleSubmit = (event) =>{
        console.log(classes)
        event.preventDefault();
        const formData = new FormData();
        Object.keys(classes).forEach(key => {
            if (key === 'image') {
                for (let i = 0; i < classes.image.length; i++) {
                    console.log(classes.image[i])
                    formData.append('image', classes.image[i]);
                }
            } else if (key !== 'user') {
                formData.append(key, classes[key]);
            }
        });

        updateClass(formData);

        // const logFormData = (formData) => {
        //     for (const entry of formData.entries()) {
        //       console.log(entry);
        //     }
        //   };
          
        // //   Assuming formData is your FormData object
        //   logFormData(formData);


        // event.preventDefault();
        // updateClass(classes);
    }

    return (
        <div>
            <h1>ClassEdit</h1>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
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

                {/* <div>
                    <p>Current Images:</p>
                    {classes.image?.map((image, index) => (
                        <img key={index} src={image} height={200} width={200} alt='class image' />
                    ))}
                </div> */}

                <div>
                    <label htmlFor="image">Images:</label>
                    <input type="file" name='image' id='image' onChange={handleChange} multiple/>
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category:</label>
                    <select className="form-select" id="category" name="category" onChange={handleChange} required>
                        {allCategories}
                    </select>
                </div>

                <button type='submit'>Update Class</button>
            </form>
        </div>
    )
}
