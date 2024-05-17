import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { PiFarm } from "react-icons/pi";
import "./Category.css";
export default function Category({ setCategory }) {

    const endpoint = "http://localhost:3001/api/insertion";



    const [dataCat, setDataCat] = useState([]);


    const getFromApi = async () => {
        try {
            const res = await fetch(endpoint);
            if (res.ok) {
                const response = await res.json();
                setDataCat(response);
            }

        }

        catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getFromApi()
    }, [])

    return (

        <>
            <div className='d-flex category-container m-5' >

                {dataCat &&
                    dataCat.map((el) => (
                        <Button variant='transparent' className='mx-2' key={el._id} value={el.category} onClick={() => setCategory(el.category)}>
                            <PiFarm />
                            <h6>{el.category}</h6>
                        </Button>
                    ))
                }
            </div>

        </>
    )
}
