import React, { useEffect, useState } from 'react';
import { FaRegHeart } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import emptyLocation from "../../assets/empty.png";
import './InsertionDetailsPage.css';
import { FaStar } from "react-icons/fa";


export default function InsertionDetailsPage(props) {

    const { title, address, category, covers, details,
        hostType, place, price, services,
        hostAvatar, hostName, hostSurname, reviews } = props;

    const [average, setAverage] = useState(0);

    const calculateAverage = (reviews) => {
        if (!Array.isArray(reviews) || reviews.length === 0) {
            return 0;
        }
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        const result = total / reviews.length;
        console.log(result);
        setAverage(result);

    };

    useEffect(() => {
        if (reviews) {
            calculateAverage(reviews);
        }
    }, [reviews]);


    return (
        <div className='mx-3'>
            <div className='d-flex justify-content-between'>
                <div>
                    <h3>{title}</h3>
                </div>
                <div className='d-flex'>
                    <div className='mx-2'>
                        <IoShareOutline className='me-2' />
                        <span>Condividi</span>
                    </div>
                    <div className='mx-2'>
                        <FaRegHeart className='me-2' />
                        <span>Salva</span>
                    </div>
                </div>
            </div>
            <Row>
                <Col md={6}>
                    <img src={covers ? covers[0] : emptyLocation}
                        className='img-fluid'
                        alt=""

                        style={{
                            borderTopLeftRadius: "15px",
                            borderBottomLeftRadius: "15px",
                            minHeight: "440px"
                        }}
                    />
                </Col>
                <Col md={6}>
                    <div className='d-flex mb-2'>
                        <img src={covers ? covers[1] : emptyLocation} className='me-2'
                            alt=""
                            style={{ height: "210px", width: "270px" }} />
                        <img src={covers ? covers[2] : emptyLocation}
                            alt=""
                            style={{ height: "210px", width: "270px", borderTopRightRadius: "15px" }} />
                    </div>
                    <div className='d-flex'>
                        <img src={covers ? covers[3] : emptyLocation}
                            className='me-2'
                            style={{ height: "210px", width: "270px" }}
                            alt="" />
                        <img src={covers ? covers[4] : emptyLocation}
                            style={{ height: "210px", width: "270px", borderBottomRightRadius: "15px" }}
                            alt="" />
                    </div>
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <div className='mt-3'>
                        <h3>{place}</h3>
                        <h6>{services ? services.roomDetails : "Nessun servizio"}, {services ? services.bathDetails : "Nessun servizio"}</h6>
                        <div className='d-flex align-items-center'>
                            <FaStar className='mb-2' />
                            <h4 className='average-num ms-1'>{average.toFixed(2)} · </h4>
                            <h4 className='reviews ms-1'>{reviews ? `${reviews.length} recensioni` : "Nessun recensione"}</h4>
                        </div>
                    </div>
                    <div className='my-3 host-info'>
                        <div className='my-3 d-flex align-items-center'>
                            <img src={hostAvatar}
                                alt=""
                                className='host-avatar' />
                            <div className='host-spec ms-2'>
                                <h3>Nome dell'host: {hostName}</h3>
                                <h4>Tipo di host: {hostType}</h4>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                </Col>
            </Row>
        </div>
    )
}
