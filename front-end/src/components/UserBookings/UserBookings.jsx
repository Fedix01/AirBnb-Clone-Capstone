import React, { useContext, useEffect, useState } from 'react';
import MyNavbar from '../MyNavbar/MyNavbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './UserBookings.css';
import tripBackground from "../../assets/airbnb-trip-background.jpg";
import { searchBarContext } from '../SearchBarProvider/SearchBarProvider';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { TiDelete } from "react-icons/ti";
import { MdOutlineWavingHand } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import { AlertContext } from '../AlertProvider/AlertProvider';
import { FooterContext } from '../FooterProvider/FooterProvider';
import FavoritesArea from '../FavoritesArea/FavoritesArea';

export default function UserBookings() {

    const { setSearchBar } = useContext(searchBarContext);

    const { setShowAllFooter } = useContext(FooterContext);

    const { setToken, token } = useContext(AuthContext);

    const { setAlert } = useContext(AlertContext);

    const [data, setData] = useState([]);

    const [spinner, setSpinner] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [showModalDelete, setShowModalDelete] = useState(false);

    const [currentUser, setCurrentUser] = useState({});

    const endpoint = `http://localhost:3001/api/insertion/userBooking/`;

    const endpointGeneric = `http://localhost:3001/api/insertion/`;

    const [key, setKey] = useState('trips');

    const navigate = useNavigate();

    const getBookings = async (tok, currentUser) => {
        try {
            setSpinner(true);
            const res = await fetch(`${endpoint}${currentUser._id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tok}`,
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const bookings = await res.json();
                console.log(bookings);
                setSpinner(false)
                setData(bookings)
            }
        } catch (error) {
            console.error(error);
            setSpinner(false)
        }
    }

    const handlePayment = async (bookingId, insertionId) => {
        try {
            const payload = {
                "confirm": true
            };
            const res = await fetch(`${endpointGeneric}${insertionId}/booking/${bookingId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const confirm = await res.json();
                console.log(confirm);
                setShowModal(false);
                setAlert("Pagamento effettuato con successo!");
                setTimeout(() => {
                    setAlert("")
                }, 4000);
                getBookings(token, currentUser)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteBooking = async (bookingId, insertionId) => {
        try {
            const res = await fetch(`${endpointGeneric}${insertionId}/booking/${bookingId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const deleted = await res.json();
                console.log(deleted);
                setAlert("Prenotazione eliminata correttamente!");
                setTimeout(() => {
                    setAlert("")
                }, 4000);
                getBookings(token, currentUser)
            }
        } catch (error) {
            console.error(error);
            setAlert("Errore durante l'eliminazione della prenotazione");
            setTimeout(() => {
                setAlert("")
            }, 4000);
        }
    }

    const dateString = (dateString) => {
        const date = new Date(dateString);

        const day = date.toLocaleString('default', { day: 'numeric' })
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return (
            <h6>{day} {month} {year}</h6>
        )
    }

    useEffect(() => {
        setSearchBar(false);
        setShowAllFooter(false);
    }, [])

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (token && user) {
            setToken(token);
            getBookings(token, JSON.parse(user));
            setCurrentUser(JSON.parse(user))
        }
    }, [])


    const endpointFav = "http://localhost:3001/api/user/favorites";

    const [dataFav, setDataFav] = useState([]);

    const getFavorites = async () => {
        try {
            const res = await fetch(endpointFav, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.ok) {
                const allFav = await res.json();
                console.log(allFav.favorites);
                setDataFav(allFav.favorites)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getFavorites()
    }, [])


    return (
        <>
            <MyNavbar />
            <Container>

                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="trips" title="Viaggi">
                        <Row>
                            <Col md={12}>
                                <h2>Viaggi</h2>
                            </Col>
                        </Row>

                        <Row className='trips-box mt-2'>
                            <Col md={6}>
                                <div className='d-flex flex-column trips-text p-4 my-2'>
                                    <MdOutlineWavingHand />
                                    <h5 className='mt-3'>Nessun viaggio prenotato... per ora!</h5>
                                    <p>È giusto il momento di rispolverare i bagagli e iniziare a programmare la tua prossima avventura.</p>
                                    <Button onClick={() => navigate("/")}>Inizia a cercare</Button>
                                </div>
                            </Col>
                            <Col md={6} className='img-cont'>
                                <img src={tripBackground} alt=""
                                    className='img-fluid trip-image'
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} className='mt-5'>
                                <h2>Le mie prenotazioni</h2>
                            </Col>
                        </Row>

                        <Row className='mt-4'>
                            {spinner &&
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            }
                            {data &&
                                data.map((booking) => (
                                    <Col md={5} key={booking._id} className='trip-container mx-2 my-2'>
                                        <>
                                            <Row className='row-trip'>

                                                <Col md={6} className='p-4'>
                                                    <Button variant='transparent' className='delete-btn' onClick={() => setShowModalDelete(true)}>
                                                        <TiDelete />
                                                    </Button>
                                                    <Modal
                                                        show={showModalDelete} onHide={() => setShowModalDelete(false)}
                                                        centered
                                                    >
                                                        <Modal.Header closeButton>

                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <h4>Eliminare la prenotazione ?</h4>

                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button onClick={() => setShowModalDelete(false)}>Chiudi</Button>
                                                            <Button variant='danger' onClick={() => deleteBooking(booking._id, booking.insertion._id)}>Elimina</Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                    <div>
                                                        <h4>{booking.insertion.title}</h4>
                                                        <h5>{booking.insertion.place}</h5>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex align-items-center'>
                                                        <div className='mx-3'>
                                                            Arrivo: {dateString(booking.checkInDate)}
                                                            Partenza: {dateString(booking.checkOutDate)}
                                                        </div>
                                                        <div className='mx-3'>
                                                            <h6>{booking.insertion.address}</h6>
                                                        </div>
                                                    </div>
                                                    <div className='text-center mt-2'>
                                                        {booking.confirm ?
                                                            <h5>Confermato!</h5>
                                                            :
                                                            <Button variant='success' onClick={() => setShowModal(true)}>Procedi al Pagamento</Button>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col md={6} className='p-0 d-flex justify-content-end'>
                                                    <img src={booking.insertion.covers[0]} alt=''
                                                        className='img-fluid' />
                                                </Col>
                                                <Modal
                                                    show={showModal} onHide={() => setShowModal(false)}
                                                    centered
                                                >
                                                    <Modal.Header closeButton>

                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <h4>Conferma la prenotazione: Totale {booking.totalPrice} €</h4>

                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button onClick={() => setShowModal(false)}>Chiudi</Button>
                                                        <Button variant='success' onClick={() => handlePayment(booking._id, booking.insertion._id)}>Paga</Button>
                                                    </Modal.Footer>
                                                </Modal>

                                            </Row>
                                        </>
                                    </Col>
                                ))}
                        </Row>
                    </Tab>
                    <Tab eventKey="favorites" title="Preferiti">
                        {dataFav &&
                            dataFav.map(el => <FavoritesArea key={el._id} address={el.address} title={el.title} category={el.category} cover={el.covers[0]} hostType={el.hostType} />)
                        }
                    </Tab>

                </Tabs>


            </Container>
        </>
    )
}
