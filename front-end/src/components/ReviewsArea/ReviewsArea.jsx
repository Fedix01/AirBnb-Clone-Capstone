import React, { useEffect, useState } from 'react';
import './ReviewsArea.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import ReviewForm from '../ReviewForm/ReviewForm';

export default function ReviewsArea({ reviews }) {

    const [data, setData] = useState([]);

    const [average, setAverage] = useState(0);

    const [token, setToken] = useState();

    const [modify, setModify] = useState("");

    const [currentUser, setCurrentUser] = useState({});

    const [showAll, setShowAll] = useState(false);

    const params = useParams();

    const endpointAll = `http://localhost:3001/api/insertion/${params.id}/allReviews`;
    const endpoint = `http://localhost:3001/api/insertion/${params.id}/reviews`;

    const endpointDel = `http://localhost:3001/api/insertion/${params.id}/reviews`;


    useEffect(() => {
        console.log(modify)
    }, [modify])


    const getfromApi = async (api) => {
        try {
            const res = await fetch(api);
            if (res.ok) {
                const allRev = await res.json();
                console.log(allRev);
                setData(allRev);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const calculateAverage = (rev) => {
        if (!Array.isArray(rev) || rev.length === 0) {
            return 0;
        }
        const total = rev.reduce((sum, review) => sum + review.rating, 0);
        const result = total / rev.length;
        console.log(result);
        setAverage(result);
    }


    const starsRating = (rating) => {
        if (rating === 1) {
            return (
                <>
                    <FaStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                </>
            )
        } else if (rating === 2) {
            return (
                <>
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                </>
            )
        } else if (rating === 3) {
            return (
                <>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                    <FaRegStar />
                </>
            )
        } else if (rating === 4) {
            return (
                <>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                </>
            )
        } else if (rating === 5) {
            return (
                <>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                </>
            )
        }
    }


    const deleteReview = async (id) => {
        try {
            const res = await fetch(`${endpointDel}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }

            });
            if (res.ok) {
                const deleted = await res.json();
                if (showAll) {
                    getfromApi(endpointAll)
                } else {
                    getfromApi(endpoint)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }


    const dateString = (dateString) => {
        const date = new Date(dateString);

        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return (
            <h4>{month} {year}</h4>
        )
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token) {
            setToken(token)
        }
        if (user) {
            setCurrentUser(JSON.parse(user))
            console.log(currentUser)
        }
    }, [])


    useEffect(() => {
        if (showAll) {
            getfromApi(endpointAll)
        } else {
            getfromApi(endpoint)
        }
    }, [showAll])




    useEffect(() => {
        if (reviews) {
            calculateAverage(reviews)

        }
    }, [reviews])




    return (
        <>
            <div className='header d-flex my-3'>
                <FaStar />
                <h4 className='ms-2'>{average.toFixed(2)} ·</h4>
                <h4 className='ms-1'>{reviews.length === 0 ? "Nessuna recensione" : `${reviews.length} recensioni`}</h4>
            </div>

            <Row>
                {data &&
                    data.map((el) => (
                        <Col md={6} key={el._id}>
                            <div className='rev-container my-4 mx-4'>
                                <div className='d-flex align-items-center'>
                                    <img src={el.user.avatar}
                                        alt=""
                                        className='avatar-rev' />
                                    <h4 className='ms-3'>{el.user.name} {el.user.surname}</h4>
                                </div>
                                <div className='d-flex align-items-center ratings mt-2'>
                                    <div>
                                        {starsRating(el.rating)} ·
                                    </div>
                                    <div className='ms-2'>
                                        {dateString(el.updatedAt)}
                                    </div>
                                </div>
                                <div className='comment mt-2'>
                                    <p>{el.comment}</p>
                                </div>
                                <div>
                                    {(el.user._id === currentUser._id) &&
                                        <>
                                            <Button variant='transparent' onClick={() => setModify(el._id)}>Modifica</Button>
                                            <Button variant='transparent' onClick={() => deleteReview(el._id)}>Elimina</Button>
                                        </>
                                    }
                                </div>
                            </div>
                        </Col>
                    ))}
                <div className='d-flex justify-content-center'>
                    {showAll ?
                        <Button variant='transparent' onClick={() => setShowAll(false)}>Nascondi recensioni</Button>
                        :
                        <Button variant='transparent' onClick={() => setShowAll(true)}>Mostra tutte le recensioni</Button>
                    }
                </div>
                <div className='mt-3'>
                    <ReviewForm getfromApi={getfromApi} showAll={showAll} modify={modify} />
                </div>
            </Row>
        </>
    )
}
