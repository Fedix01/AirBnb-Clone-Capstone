import React, { useContext, useEffect, useState } from 'react';
import MyNavbar from '../MyNavbar/MyNavbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './UserBookings.css';
import tripBackground from "../../assets/airbnb-trip-background.jpg";
import { searchBarContext } from '../SearchBarProvider/SearchBarProvider';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { MdOutlineWavingHand } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';

export default function UserBookings() {

    const { setSearchBar } = useContext(searchBarContext);

    const { setToken } = useContext(AuthContext);

    const [data, setData] = useState([]);

    const endpoint = `http://localhost:3001/api/insertion/userBooking/`;

    const navigate = useNavigate();

    const getBookings = async (tok, currentUser) => {
        try {
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
                setData(bookings)
            }
        } catch (error) {
            console.error(error)
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
        setSearchBar(false)
    }, [])

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (token && user) {
            setToken(token)
            getBookings(token, JSON.parse(user))
        }
    }, [])


    return (
        <>
            <MyNavbar />
            <Container>

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
                    {data &&
                        data.map((booking) => (
                            <Col md={6} key={booking._id} className='trip-container'>
                                <>
                                    <Row>

                                        <Col md={6} className='p-4'>
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
                                                <Button variant='success'>Procedi al Pagamento</Button>
                                            </div>
                                        </Col>
                                        <Col md={6} className='p-0 d-flex justify-content-end'>
                                            <img src={booking.insertion.covers[0]} alt=''
                                                className='img-fluid' />
                                        </Col>
                                    </Row>
                                </>
                            </Col>
                        ))}
                </Row>
            </Container>
        </>
    )
}
