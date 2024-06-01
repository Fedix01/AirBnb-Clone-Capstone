import React, { useContext, useEffect, useState } from 'react';
import './BookingForm.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AlertContext } from '../AlertProvider/AlertProvider';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import ModalBody from 'react-bootstrap/esm/ModalBody';

export default function BookingForm({ price, id }) {



    const endpoint = `http://localhost:3001/api/insertion/${id}/booking`;

    const { setToken } = useContext(AuthContext);

    const { setAlert } = useContext(AlertContext);

    const [currentUser, setCurrentUser] = useState({});

    const [formData, setFormData] = useState({
        checkInDate: null,
        checkOutDate: null,
        guestNum: 0,
        totalPrice: 0
    });

    const [showModal, setShowModal] = useState(false);

    const [totalNights, setTotalNights] = useState(0);

    const [partialPrice, setPartialPrice] = useState(0);

    const [servicesPrice, setServicesPrice] = useState(0);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");


    const handleSelectChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, guestNum: Number(value) })
    }

    const handlePartialPrice = () => {
        if (price && totalNights) {
            const part = price * totalNights;
            setPartialPrice(part)

        }
    }

    const handleServicesPrice = () => {
        if (partialPrice) {
            const result = ((partialPrice / 100) * 20);
            setServicesPrice(result)
        }

    }

    const calculateTotalPrice = () => {
        return (partialPrice + servicesPrice).toFixed(2)
    }


    const createBooking = async (event) => {
        event.preventDefault();
        if (currentUser.isHost) {
            setAlert("Errore: Un host non può prenotare");
            setTimeout(() => {
                setAlert("")
            }, 4000);
        } else {
            if (token) {
                try {
                    const payload = {
                        "checkInDate": formData.checkInDate,
                        "checkOutDate": formData.checkOutDate,
                        "guestNum": formData.guestNum,
                        "totalPrice": formData.totalPrice,
                        "confirm": false
                    };
                    const res = await fetch(endpoint, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });
                    if (res.ok) {
                        const post = await res.json();
                        console.log(post);
                        setAlert("prenotazione");

                    }
                } catch (error) {
                    console.error(error);
                    setAlert("Errore nella prenotazione");
                    setTimeout(() => {
                        setAlert("")
                    }, 4000);
                }

            } else {
                navigate("/logIn");
                setAlert("Per prenotare devi effettuare il login");
                setTimeout(() => {
                    setAlert("")
                }, 4000);
            }
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setCurrentUser(JSON.parse(user));
            console.log(currentUser)
        }
    }, [])


    useEffect(() => {
        setToken(token);
    }, [token])


    useEffect(() => {
        if (formData.checkInDate && formData.checkOutDate) {
            const checkIn = new Date(formData.checkInDate);
            const checkOut = new Date(formData.checkOutDate);
            const timeDifference = checkOut - checkIn;
            const daysDifference = timeDifference / (1000 * 3600 * 24);

            if (daysDifference > 0) {
                setTotalNights(daysDifference);
            } else {
                setTotalNights(0);
            }
        }
    }, [formData.checkInDate, formData.checkOutDate]);

    useEffect(() => {
        handlePartialPrice()
    }, [price, totalNights])

    useEffect(() => {
        handleServicesPrice()
    }, [partialPrice])

    useEffect(() => {
        const total = calculateTotalPrice();
        setFormData({ ...formData, totalPrice: total })
    }, [partialPrice, servicesPrice])


    return (
        <div className='booking-container mx-3'>
            <div className='d-flex align-items-center mb-2'>
                <h4>{price}€</h4>
                <h6 className='ms-2'>notte</h6>
            </div>
            <Form onSubmit={createBooking}>
                <div className='booking-box'>
                    <div className='date d-flex'>
                        <div>
                            <h6>CHECK-IN</h6>
                            <input type="date"
                                required
                                onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })} />
                        </div>
                        <div>
                            <h6>CHECK-OUT</h6>
                            <input type="date"
                                required
                                onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })} />
                        </div>
                    </div>
                    <hr />
                    <div className='guest'>
                        <h6>OSPITI</h6>
                        <Form.Select
                            required
                            value={formData.guestNum}
                            onChange={handleSelectChange}>
                            <option value="1">Uno</option>
                            <option value="2">Due</option>
                            <option value="3">Tre</option>
                            <option value="4">Quattro</option>
                            <option value="5">Cinque</option>
                            <option value="6">Sei</option>
                        </Form.Select>
                    </div>
                </div>
                <div className='booking-btn my-4 d-flex justify-content-center'>
                    <Button type='submit'>Prenota</Button>
                </div>

                <div className='costs mt-4 py-4'>
                    <div className='d-flex justify-content-between align-items-center my-1 p-1'>
                        <h6>{price} € x {totalNights}</h6>
                        <h6>{partialPrice.toFixed(2)} €</h6>
                    </div>
                    <div className='d-flex justify-content-between align-items-center my-1 p-1'>
                        <h6 onClick={() => setShowModal(true)}>Costi del servizio Airbnb</h6>
                        <h6>{servicesPrice.toFixed(2)} €</h6>
                    </div>


                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>Questi costi ci aiutano a gestire la nostra piattaforma e a offrire servizi come un'assistenza h24 per il tuo viaggio. IVA inclusa.
                        </Modal.Body>
                    </Modal>
                </div>
                <div className='mt-3  p-1 d-flex justify-content-between'>
                    <h5>Totale</h5>
                    <h5>{calculateTotalPrice()} €</h5>
                </div>
            </Form>
        </div>
    )
}
