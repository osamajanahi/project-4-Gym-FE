import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MyClasses from './MyClasses';


export default function MyClassesList(props) {
    const [receipts, setReceipts] = useState([]);
    // const [categories, setCategories] = useState([]);
    
    useEffect(() =>{
        loadReceipts()
    }, [])
console.log(receipts)

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

    const allReceipts = receipts.map((receipt, index) =>(
        <tr key={index}>
            <MyClasses {...receipt}/>
        </tr>
    ))

    return (
        <div>
            <h1>My Classes</h1>
            {allReceipts}
        </div>
    )
}
