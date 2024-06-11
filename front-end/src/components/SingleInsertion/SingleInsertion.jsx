import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import emptyLocation from "../../assets/empty.png";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import './SingleInsertion.css';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertProvider/AlertProvider';
export default function SingleInsertion(props) {

    const { id, covers, price, place, hostType, reviews, hostName, hostSurname } = props;

    const navigate = useNavigate();

    const { setAlert } = useContext(AlertContext);

    const [index, setIndex] = useState(0);

    const [revAverage, setRevAverage] = useState(0);

    const [token, setToken] = useState("");

    const [currentUser, setCurrentUser] = useState({});

    const [fav, setFav] = useState(false);

    const endpointFav = "http://localhost:3001/api/user/";

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const calculateAverage = (reviews) => {
        if (!Array.isArray(reviews) || reviews.length === 0) {
            return 0;
        }
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        const result = total / reviews.length;
        console.log(result);
        setRevAverage(result.toFixed(2));

    };

    const dateIns = () => {
        const today = new Date();
        const firstDay = today.toLocaleString('default', { day: 'numeric' });
        const firstMonth = today.toLocaleString('default', { month: 'short' })
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 4);
        const lastDay = futureDate.toLocaleString('default', { day: 'numeric' })
        const lastMonth = futureDate.toLocaleString('default', { month: 'short' })
        return (
            <h6>{firstDay} {firstMonth} - {lastDay} {lastMonth}</h6>
        )
    }

    const addToFavorites = async (e) => {
        e.stopPropagation();
        if (Object.keys(currentUser).length) {
            if (currentUser.isHost === true) {
                setAlert("Gli host non possono aggiungere ai preferiti");
                setTimeout(() => {
                    setAlert("")
                }, 4000);
            } else {
                try {
                    const res = await fetch(`${endpointFav}${id}/favorites`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }

                    });
                    if (res.ok) {
                        const add = await res.json();
                        console.log(add);
                        setCurrentUser(add);
                        localStorage.setItem('user', JSON.stringify(add));
                        setAlert("Struttura aggiunta ai preferiti!");
                        setTimeout(() => {
                            setAlert("")
                        }, 4000);
                    }
                } catch (error) {
                    console.error(error);
                    setAlert("Errore nell'aggiunta ai preferiti");
                    setTimeout(() => {
                        setAlert("")
                    }, 4000);
                }
            }

        } else {
            setAlert("Per aggiungere ai preferiti ti devi loggare");
            setTimeout(() => {
                setAlert("")
            }, 4000);
            navigate("/logIn")
        }
    }

    const deleteFromFavorites = async (e) => {
        e.stopPropagation();
        try {
            const res = await fetch(`${endpointFav}${id}/favorites`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const deleted = await res.json();
                setCurrentUser(deleted);
                localStorage.setItem('user', JSON.stringify(deleted));
                setFav(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleFav = () => {

        if (currentUser && currentUser.favorites && currentUser.favorites.includes(id)) {
            setFav(true)
        } else if (!currentUser) {
            setFav(false)
        }

    }

    useEffect(() => {
        calculateAverage(reviews)
    }, [reviews])

    useEffect(() => {
        const tok = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (tok) {
            setToken(tok)
        }
        if (user) {
            setCurrentUser(JSON.parse(user))
        };
        if (user && tok) {
            handleFav()
        }
    }, [])

    useEffect(() => {
        handleFav()
    }, [id, currentUser])


    return (
        <>

            <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>

                {covers &&
                    covers.map((el) => (
                        <Carousel.Item key={el}
                            onClick={() => navigate(`/insertionDetails/${id}`)}
                            style={{ cursor: "pointer" }}>
                            <img src={el}
                                alt=''
                                className='img-insertion'
                            />
                        </Carousel.Item>
                    ))}
                {!covers &&
                    <Carousel.Item>
                        <img src={emptyLocation}
                            alt=''
                            className='img-insertion'
                        />
                    </Carousel.Item>
                }


            </Carousel>

            <div className='info d-flex justify-content-between mt-2'>
                <div>
                    <h5 onClick={() => navigate(`/insertionDetails/${id}`)}
                        style={{ cursor: "pointer" }}
                    >{place}</h5>
                    {dateIns()}
                    <h6>{hostType}: {hostName} {hostSurname}</h6>
                    <h5><b>{price} €</b> notte</h5>
                </div>
                <div className='d-flex me-4'>
                    <FaStar className='me-1' />
                    <h5>{revAverage}</h5>
                </div>
                {revAverage >= 4 &&
                    <div className='upper-text'>
                        <h5 className='m-0'>Amato dagli ospiti</h5>
                    </div>
                }
                {fav ?
                    <>
                        <div className='add-favorites' onClick={(e) => deleteFromFavorites(e)}>
                            <IoMdHeart />
                        </div>
                    </>
                    :
                    <>
                        <div className='add-favorites' onClick={(e) => addToFavorites(e)}>
                            <FaRegHeart />
                        </div>
                    </>}
            </div>
        </>
    )

}
