import React, { useEffect, useState } from 'react';
import './BookingForm.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function BookingForm({ price }) {


    const [formData, setFormData] = useState({
        checkInDate: null,
        checkOutDate: null,
        guestNum: 0
    });

    const [showModal, setShowModal] = useState(false);

    const [totalNights, setTotalNights] = useState(0);

    const [partialPrice, setPartialPrice] = useState(0);

    const [servicesPrice, setServicesPrice] = useState(0);

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

    const totalPrice = () => {
        return partialPrice + servicesPrice
    }


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


    return (
        <div className='booking-container mx-3'>
            <div className='d-flex align-items-center mb-2'>
                <h4>{price}</h4>
                <h6 className='ms-2'>notte</h6>
            </div>
            <div className='booking-box'>
                <div className='date d-flex'>
                    <div>
                        <h6>CHECK-IN</h6>
                        <input type="date"
                            onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })} />
                    </div>
                    <div>
                        <h6>CHECK-OUT</h6>
                        <input type="date"
                            onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })} />
                    </div>
                </div>
                <hr />
                <div className='guest'>
                    <h6>OSPITI</h6>
                    <Form.Select
                        value={formData.guestNum}
                        onChange={(e) => setFormData({ ...formData, guestNum: e.target.value })}>
                        <option>Inserisci il numero di ospiti</option>
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
                <Button>Prenota</Button>
            </div>
            <div className='costs mt-4 py-4'>
                <div className='d-flex justify-content-between align-items-center my-1 p-1'>
                    <h6>{price} € x {totalNights}</h6>
                    <h6>{partialPrice} €</h6>
                </div>
                <div className='d-flex justify-content-between align-items-center my-1 p-1'>
                    <h6 onClick={() => setShowModal(true)}>Costi del servizio Airbnb</h6>
                    <h6>{servicesPrice} €</h6>
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
                <h5>{totalPrice()} €</h5>
            </div>
        </div>
    )
}
