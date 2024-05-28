import React, { useEffect, useState } from 'react';
import './ReviewsArea.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaStar } from "react-icons/fa";


export default function ReviewsArea({ insertionId, reviews }) {

    const [data, setData] = useState([]);

    const [average, setAverage] = useState(0);


    const endpoint = `http://localhost:3001/api/insertion/${insertionId}/reviews`;


    const getfromApi = async () => {
        try {
            const res = await fetch(endpoint);
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

    useEffect(() => {
        getfromApi()
    }, [])


    useEffect(() => {
        if (reviews) {
            calculateAverage(reviews)

        }
    }, [reviews])


    return (
        <>
            <div className='header d-flex my-3'>
                <FaStar />
                <h4 className='ms-2'>{average} ·</h4>
                <h4 className='ms-1'>{reviews.length} recensioni</h4>
            </div>

            <Row>
                <Col md={6}>
                    {data &&
                        data.map((el) => (
                            <div className='rev-container' key={el._id}>

                            </div>
                        ))}
                </Col>
            </Row>
        </>
    )
}
