import React, { useEffect, useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar'
import Category from '../Category/Category'
import AllInsertions from '../AllInsertions/AllInsertions'

export default function Homepage() {

    const [data, setData] = useState([]);

    const [category, setCategory] = useState("");

    const endpoint = "http://localhost:3001/api/insertion";

    const endpointCategories = "http://localhost:3001/api/insertion/findByCategory/";

    const getFromApi = async (singleCategory) => {
        try {
            if (!singleCategory) {
                const res = await fetch(endpoint);
                if (res.ok) {
                    const response = await res.json();
                    setData(response);
                }

            } else {
                const res = await fetch(`${endpointCategories}${category}`);
                if (res.ok) {
                    const response = await res.json();
                    setData(response)
                }
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (category) {
            getFromApi(category)
        } else {
            getFromApi()
        }
    }, [category])


    return (
        <>
            <MyNavbar />
            <Category setCategory={setCategory} />
            <AllInsertions data={data} />
        </>
    )
}
