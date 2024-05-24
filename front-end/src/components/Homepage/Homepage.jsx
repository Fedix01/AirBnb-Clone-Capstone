import React, { useContext, useEffect, useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar'
import Category from '../Category/Category'
import AllInsertions from '../AllInsertions/AllInsertions'
import { searchBarContext } from '../SearchBarProvider/SearchBarProvider';

export default function Homepage() {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);

    const [stopLoad, setStopLoad] = useState(false);

    const { setSearchBar } = useContext(searchBarContext);

    const [category, setCategory] = useState("");

    const [page, setPage] = useState(0);

    const endpoint = `http://localhost:3001/api/insertion/pagination?page=${page}`;

    const endpointCategories = `http://localhost:3001/api/insertion/findByCategory/`;

    const getFromApi = async (singleCategory) => {
        try {


            let res;
            if (!singleCategory) {
                res = await fetch(endpoint);
            } else {
                res = await fetch(`${endpointCategories}${singleCategory}/pagination?page=${page}`);
            }

            if (res.ok) {
                const response = await res.json();
                setData(response)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loadData = async (singleCategory) => {

        try {
            let res;
            if (!singleCategory) {
                res = await fetch(endpoint);
            } else {
                res = await fetch(`${endpointCategories}${singleCategory}/pagination?page=${page}`);
            };
            if (res.ok) {
                const response = await res.json();
                setData([...data, ...response])
                if (response.length === 0) {
                    setStopLoad(true)
                } else {
                    setStopLoad(false)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        setPage(0)
        setData([])
        getFromApi(category);
    }, [category]);

    useEffect(() => {
        loadData(category)
    }, [page])


    useEffect(() => {
        setSearchBar(true)
    }, [])



    return (
        <>
            <MyNavbar />
            <Category setCategory={setCategory} />
            <AllInsertions data={data} setPage={setPage} loading={loading} stopLoad={stopLoad} />
        </>
    )
}
