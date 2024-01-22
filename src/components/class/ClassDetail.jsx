import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
export default function ClassDetail(props) {

    const [classes, setClasses] = useState({});
    const [date, setDate] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() =>{
        loadClasses(id)
    },{})

    const loadClasses = (id) =>{
        Axios.get(`/class/edit?id=${id}`)
        .then(res =>{
            setClasses(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const addUser = (ids) =>{
        // console.log(ids)
        Axios.get(`/class/enroll?class=${ids.class}&user=${ids.user}`)
        .then(() =>{
            addReiept(ids)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const addReiept = (data) =>{
        Axios.post(`/receipt/add`, data)
        .then(() =>{
            navigate('/class');
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const handelChange = (event) =>{
        setDate(event.target.value);
    }


    const handleSubmit = (event) =>{
        event.preventDefault();
        let endDate = new Date(date);
        endDate.setDate(endDate.getDate()+30)
        endDate = endDate.toISOString().split('T')[0];
        addUser({"class": classes._id, "user": props.userId, "startDate": date, "endDate": endDate})
    }


    let currentDate = new Date();

    let tenthDay = new Date(currentDate);
    tenthDay.setDate(currentDate.getDate() + 10);

    let formattedTenthDay = tenthDay.toISOString().split('T')[0]

    currentDate = new Date().toISOString().split('T')[0];

    return (
        
        <div>
            <h1>ClassDetail</h1>
                <h3>Class: {classes.name}</h3>
                <h3>Duration: {classes.duration}</h3>
                <h3>Price: {classes.price}</h3>
                <h3>Description: {classes.description}</h3>
                <h3>Images:</h3>
                {classes.image?.map((image, index) => (
                    <img key={index} src={image} alt='class image' height={100} width={100}/>
                ))}

                <br />

                <form onSubmit={handleSubmit}>
                    <label htmlFor="date">Starting Date:</label>
                    <input type="date" id="date" name="date" min={currentDate} max={formattedTenthDay} onChange={handelChange} required />
                    <button type='submit'>Enroll</button>
                </form>
        </div>
    )
}
