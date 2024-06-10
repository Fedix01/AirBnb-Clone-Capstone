import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaRegHeart } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import emptyLocation from "../../assets/empty.png";
import './InsertionDetailsPage.css';
import { FaStar } from "react-icons/fa";
import BookingForm from '../BookingForm/BookingForm';
import ReviewsArea from '../ReviewsArea/ReviewsArea';
import { AlertContext } from '../AlertProvider/AlertProvider';


export default function InsertionDetailsPage(props) {

    const { id, title, address, category, covers, details,
        hostType, place, price, services, hostBirthday,
        hostAvatar, hostName, hostSurname, reviews, reviewUpdate,
        insertions, hostCreatedAt, checkInRule, checkOutRule, petsRule } = props;

    const [average, setAverage] = useState(0);

    const [show, setShow] = useState(false);

    const [token, setToken] = useState("");

    const { setAlert } = useContext(AlertContext);

    const [currentUser, setCurrentUser] = useState({});

    const ref = useRef(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const endpointFav = "http://localhost:3001/api/user/";


    const addToFavorites = async () => {
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
    }

    const calculateAverage = (reviews) => {
        if (!Array.isArray(reviews) || reviews.length === 0) {
            return 0;
        }
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        const result = total / reviews.length;
        console.log(result);
        setAverage(result);

    };

    const convertDate = (dateString) => {
        const date = new Date(dateString);

        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return (
            <h5>{month} {year}</h5>
        )
    }

    const freeCancDate = (daysAhead) => {
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + daysAhead);
        const day = futureDate.toLocaleString('default', { day: 'numeric' })
        const month = futureDate.toLocaleString('default', { month: 'short' })
        return (
            <b>{day} {month}</b>
        )
    }


    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        if (reviews) {
            calculateAverage(reviews);
        }
    }, [reviews]);

    useEffect(() => {
        const tokenUser = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (tokenUser) {
            setToken(tokenUser)
        }
        if (user) {
            setCurrentUser(JSON.parse(user))
        }
    }, [])


    return (
        <div className='mx-3'>
            <div className='d-flex justify-content-between'>
                <div>
                    <h3>{title}</h3>
                </div>
                <div className='d-flex'>
                    <div className='mx-2' style={{ cursor: "pointer" }} >
                        <IoShareOutline className='me-2' />
                        <span>Condividi</span>
                    </div>
                    <div className='mx-2' style={{ cursor: "pointer" }} onClick={() => addToFavorites()}>
                        <FaRegHeart className='me-2' />
                        <span>Salva</span>
                    </div>
                </div>
            </div>
            <Row className='img-row'>
                <Col md={6} sm={12}>
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
                <Col md={6} sm={12}>
                    <div className='d-block d-md-flex mb-2'>
                        <img src={covers ? (covers[1] ? covers[1] : emptyLocation) : emptyLocation} className='me-2'
                            alt=""
                            style={{ height: "210px", width: "270px" }} />
                        <img src={covers ? (covers[2] ? covers[2] : emptyLocation) : emptyLocation}
                            alt=""
                            style={{ height: "210px", width: "270px", borderTopRightRadius: "15px" }} />
                    </div>
                    <div className='d-block d-md-flex'>
                        <img src={covers ? (covers[3] ? covers[3] : emptyLocation) : emptyLocation}
                            className='me-2'
                            style={{ height: "210px", width: "270px" }}
                            alt="" />
                        <img src={covers ? (covers[4] ? covers[4] : emptyLocation) : emptyLocation}
                            style={{ height: "210px", width: "270px", borderBottomRightRadius: "15px" }}
                            alt="" />
                    </div>
                </Col>
            </Row>

            <Row>
                <Col md={7} sm={12}>
                    <div className='mt-3'>
                        <h3>{place}</h3>
                        <h6>{services ? services.roomDetails : "Nessun servizio"}, {services ? services.bathDetails : "Nessun servizio"}</h6>
                        <div className='d-flex align-items-center'>
                            <FaStar className='mb-2' />
                            <h4 className='average-num ms-1'>{average.toFixed(2)} · </h4>
                            <h4 className='reviews ms-1' onClick={handleClick} style={{ cursor: "pointer" }}>{reviews ? `${reviews.length} recensioni` : "Nessun recensione"}</h4>
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
                    <div className='my-4 py-5 details'>
                        <h3>Informazioni sulla struttura</h3>
                        <p>{details}</p>
                        <Button variant="transparent" onClick={handleShow}>
                            Mostra altro
                        </Button>

                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Informazioni sulla struttura</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{details}</Modal.Body>

                        </Modal>

                    </div>
                </Col>
                <Col md={5} sm={12} className='mt-5'>
                    <BookingForm price={price} id={id} />
                </Col>
            </Row>
            <Row>
                <Col md={12} sm={12} className='mt-5'>
                    <div className='comment-box' ref={ref}>
                        <ReviewsArea reviews={reviews} insertionId={id} reviewUpdate={reviewUpdate} />

                    </div>
                </Col>
            </Row>
            <hr className='my-5' />
            <Row>
                <Col md={12} sm={12}>
                    <h3>Informazioni sull'Host</h3>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col md={4}>
                    <div className='host-container'>

                        <Row>
                            <Col md={8}>
                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                    <img src={hostAvatar}
                                        style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                                        className='my-2'
                                        alt="" />
                                    <h3 className='my-1'>{hostName}</h3>
                                    <h5>{hostType}</h5>

                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                    <div className='ins-tot'>
                                        <h6>Inserzioni totali</h6>
                                        <h4>{insertions ? insertions.length : ""}</h4>
                                    </div>
                                    <div className='mt-2'>
                                        <h6>Host da</h6>
                                        {convertDate(hostCreatedAt)}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </Col>
                <Col md={8}>
                    <div className='mx-3 p-2'>
                        <h4>{hostName} è un {hostType}</h4>
                        <h6 style={{ fontWeight: "400" }}>
                            {hostType === "Host professionista" ?
                                "Host professionista (commerciante): Qualsiasi parte che affitti una o più strutture ricettive per scopi connessi alla propria attività commerciale o professione principale."
                                :
                                "Host privato (non commerciante): Qualsiasi parte che affitti una o più strutture ricettive per scopi non connessi alla propria attività commerciale o professione principale."
                            }
                        </h6>
                        <h6 className='my-3'>Data di nascita di {hostName} {hostSurname}: {hostBirthday}</h6>
                    </div>
                </Col>
            </Row>
            <hr className='my-5' />
            <Row>
                <Col md={12}>
                    <h2>Da sapere</h2>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h5 className='my-2'>Regole della casa</h5>
                    <h6 className='p-2'>Check-In: <b>{checkInRule}</b></h6>
                    <h6 className='p-2'>Check-Out entro le ore: <b>{checkOutRule}</b></h6>
                    <h6 className='p-2'>Animali domestici: <b>{petsRule ? "Ammessi" : "NON ammessi"}</b></h6>

                </Col>

                <Col md={6}>
                    <h5 className='my-2'>Termini di cancellazione</h5>
                    <h6 className='p-2'>Cancellazione gratuita entro il giorno: {freeCancDate(7)}</h6>
                    <h6 className='p-2'>Leggi i termini di cancellazione completi dell'host, che si applicano anche in caso di malattia o disagi legati alla pandemia di COVID-19.</h6>
                </Col>
            </Row>
        </div>
    )
}
