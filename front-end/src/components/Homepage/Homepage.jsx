import React, { useEffect, useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar'
import Category from '../Category/Category'
import AllInsertions from '../AllInsertions/AllInsertions'

export default function Homepage() {

    const [data, setData] = useState([]);

    const endpoint = "http://localhost:3001/api/insertion";

    const getFromApi = async () => {
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
        getFromApi()
    }, [])

    return (
        <>
            <MyNavbar />
            <Category />
            <AllInsertions data={data} />
        </>
    )
}
