import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { PiFarm } from "react-icons/pi";
import "./Category.css";
import { PiBuildingApartment } from "react-icons/pi";
import { MdHotel } from "react-icons/md";
import { MdCabin } from "react-icons/md";
import { MdMapsHomeWork } from "react-icons/md";
import { IoEarth } from "react-icons/io5";
export default function Category({ setCategory }) {

    const endpoint = "http://localhost:3001/api/insertion";



    const [dataCat, setDataCat] = useState([]);


    const getFromApi = async () => {
        try {
            const res = await fetch(endpoint);
            if (res.ok) {
                const response = await res.json();

                const categories = response.map((el) => el.category);
                const filtered = categories.filter((el, index) => categories.indexOf(el) === index);
                console.log(filtered);
                setDataCat(filtered)
            }

        }

        catch (error) {
            console.error(error)
        }
    }



    const handleCategoriesPics = (category) => {
        if (category === "Appartamento") {
            return (
                <PiBuildingApartment />
            )
        } else if (category === "Hotel") {
            return (
                <MdHotel />
            )
        } else if (category === "Baita") {
            return (
                <MdCabin />
            )
        } else {
            return (
                <MdMapsHomeWork />
            )
        }
    }

    useEffect(() => {
        getFromApi()
    }, [])

    return (

        <>
            <div className='d-flex category-container m-5' >
                <Button variant='transparent' className='mx-2' onClick={() => setCategory("")}>
                    <IoEarth />
                    <h6>Tutte</h6>
                </Button>
                {dataCat &&
                    dataCat.map((el) => (
                        <Button variant='transparent' className='mx-2' key={el} value={el} onClick={() => setCategory(el)}>
                            {handleCategoriesPics(el)}
                            <h6>{el}</h6>
                        </Button>
                    ))
                }
            </div>

        </>
    )
}
