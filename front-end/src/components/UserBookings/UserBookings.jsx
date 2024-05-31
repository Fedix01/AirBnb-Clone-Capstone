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
                    <Col md={12}>
                        {data &&
                            data.map((booking) => (
                                <>
                                    <div key={booking._id}>
                                    </div>
                                </>
                            ))}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
