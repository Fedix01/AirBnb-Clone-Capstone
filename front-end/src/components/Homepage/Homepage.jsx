import React, { useContext, useEffect, useState } from 'react';
import queryString from 'query-string';
import MyNavbar from '../MyNavbar/MyNavbar'
import Category from '../Category/Category'
import AllInsertions from '../AllInsertions/AllInsertions'
import { searchBarContext } from '../SearchBarProvider/SearchBarProvider';
import { AlertContext } from '../AlertProvider/AlertProvider';
import MyFooter from '../MyFooter/MyFooter';
import { FooterContext } from '../FooterProvider/FooterProvider';

export default function Homepage() {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);

    const [spinner, setSpinner] = useState(false);

    const [stopLoad, setStopLoad] = useState(false);

    const { setSearchBar } = useContext(searchBarContext);

    const { setShowAllFooter } = useContext(FooterContext);

    const { setAlert } = useContext(AlertContext);

    const [category, setCategory] = useState("");

    const [page, setPage] = useState(0);

    const [searchFormData, setSearchFormData] = useState({
        placeInput: "",
        checkInDate: null,
        checkOutDate: null,
        guestNum: 0
    });

    const endpoint = `http://localhost:3001/api/insertion/pagination?page=${page}`;

    const endpointCategories = `http://localhost:3001/api/insertion/findByCategory/`;

    const endpointSearch = `http://localhost:3001/api/insertion/search`;

    const params = queryString.parse(window.location.search);

    const getFromApi = async (singleCategory) => {
        try {

            setSpinner(true);
            let res;
            if (!singleCategory) {
                res = await fetch(endpoint);
            } else {
                res = await fetch(`${endpointCategories}${singleCategory}/pagination?page=${page}`);
            }

            if (res.ok) {
                const response = await res.json();
                setData(response);
                console.log(response)
                setSpinner(false)
            }
        } catch (error) {
            console.error(error);
            setSpinner(false);
            setAlert("Errore nel caricamento delle inserzioni");
            setTimeout(() => {
                setAlert("")
            }, 4000);
        }
    };

    const loadData = async (singleCategory) => {

        try {
            setLoading(true);
            let res;
            if (!singleCategory) {
                res = await fetch(endpoint);
            } else {
                res = await fetch(`${endpointCategories}${singleCategory}/pagination?page=${page}`);
            };
            if (res.ok) {
                const response = await res.json();
                setData([...data, ...response])
                setLoading(false);
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

    const filteredNavSearch = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                "placeInput": searchFormData.placeInput,
                "checkInDate": searchFormData.checkInDate,
                "checkOutDate": searchFormData.checkOutDate
            };
            const res = await fetch(endpointSearch, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const search = await res.json();
                setData(search)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getParams = () => {


        if (Object.keys(params).length > 0) {
            const userGoogle = {

                token: params.accessToken
                ,
                user: {
                    _id: params._id || "",
                    name: params.name || "",
                    surname: params.surname || "",
                    username: params.username || "",
                    birthday: params.birthday || "",
                    avatar: params.avatar || "",
                    email: params.email || "",
                    password: params.password || "",
                    isHost: false,
                    googleId: params.googleId || ""
                }
            }
            if (userGoogle) {
                localStorage.setItem("user", JSON.stringify(userGoogle.user));
                localStorage.setItem("token", userGoogle.token);
                console.log(userGoogle)
            }
        }
    }

    useEffect(() => {
        getParams()
    }, [params])


    useEffect(() => {
        setPage(0)
        setData([])
        getFromApi(category);
    }, [category]);

    useEffect(() => {
        loadData(category)
    }, [page])


    useEffect(() => {
        setSearchBar(true);
        setShowAllFooter(false)
    }, [])




    return (
        <>
            <MyNavbar setSearch={setSearchFormData}
                searchForm={searchFormData}
                placeInput={searchFormData.placeInput}
                checkInDate={searchFormData.checkInDate}
                checkOutDate={searchFormData.checkOutDate}
                guestNum={searchFormData.guestNum}
                filteredNavSearch={filteredNavSearch}
            />
            <Category setCategory={setCategory} />
            <AllInsertions data={data} setPage={setPage}
                loading={loading}
                stopLoad={stopLoad}
                spinner={spinner} />
            <MyFooter />
        </>
    )
}
