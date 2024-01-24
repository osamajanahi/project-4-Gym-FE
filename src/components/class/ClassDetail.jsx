import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
export default function ClassDetail(props) {

    const [classes, setClasses] = useState({});
    const [date, setDate] = useState();
    const [receipts, setReceipts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() =>{
        loadClasses(id)
        loadReceipts()
    },{})

    const loadReceipts = () =>{
        Axios.get(`/receipt/myReceipts?user=${props.userId}`)
        .then(result =>{
            console.log(result.data)
            setReceipts(result.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }

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
        
        <div className="container mt-4">
                <h3>Class: <span className='inner-name'>{classes.name}</span></h3>
                <h3>Duration: <span className='inner-name'>{classes.duration}</span></h3>
                <h3>Days: <span className='inner-name'>{classes.days}</span></h3>
                <h3>Price: <span className='inner-name'>{classes.price}BD (per month)</span></h3>
                <h3>Description: <span className='inner-name'>{classes.description}</span></h3>
                <h3>Images:</h3>
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {classes.image?.map((image, index) => (
                        <div key={index} className={`carousel-item ${index == 0 ? 'active' : ''}`}>
                            <img src={image} alt={`class image ${index + 1}`} className="d-block"  height={400} width={400} />
                        </div>
                        ))}
                    </div>
                </div>

                <br />

                <form onSubmit={handleSubmit}>
                    <label htmlFor="date">Starting Date:</label>
                    <input type="date" id="date" name="date" min={currentDate} max={formattedTenthDay} onChange={handelChange} required />
                    <button type='submit'>Enroll</button>
                </form>
        </div>
    )
}
