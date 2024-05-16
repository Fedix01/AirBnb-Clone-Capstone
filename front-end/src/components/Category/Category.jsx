import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { PiFarm } from "react-icons/pi";
import "./Category.css";
export default function Category() {

    const [data, setData] = useState([]);

    const endpoint = "http://localhost:3001/api/insertion";

    const getCategory = async () => {
        try {
            const res = await fetch(endpoint);
            if (res.ok) {
                const response = await res.json();
                setData(response);
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCategory()
        console.log(data)
    }, [])


    return (

        <>
            {data &&
                data.map((el) => (
                    <div className='d-flex category-container m-5' key={el}>
                        <Button variant='transparent' className='mx-2'>
                            <PiFarm />
                            <h6>{el.category}</h6>
                        </Button>
                    </div>
                ))
            }
        </>
    )
}
