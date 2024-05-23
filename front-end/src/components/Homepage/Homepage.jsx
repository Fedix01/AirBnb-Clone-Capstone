import React, { useContext, useEffect, useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar'
import Category from '../Category/Category'
import AllInsertions from '../AllInsertions/AllInsertions'
import { searchBarContext } from '../SearchBarProvider/SearchBarProvider';

export default function Homepage() {

    const [data, setData] = useState([]);


    const { setSearchBar } = useContext(searchBarContext);

    const [category, setCategory] = useState("");

    const [page, setPage] = useState(0);

    const endpoint = `http://localhost:3001/api/insertion/pagination?page=${page}`;

    const endpointCategories = "http://localhost:3001/api/insertion/findByCategory/";

    const getFromApi = async (singleCategory) => {
        try {
            if (!singleCategory) {
                const res = await fetch(endpoint);
                if (res.ok) {
                    const response = await res.json();
                    setData(response);
                    console.log(response)

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

    useEffect(() => {
        setSearchBar(true)
    }, [])

    useEffect(() => {
        getFromApi()
    }, [page])

    return (
        <>
            <MyNavbar />
            <Category setCategory={setCategory} />
            <AllInsertions data={data} setPage={setPage} page={page} />
        </>
    )
}
