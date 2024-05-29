import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import Container from 'react-bootstrap/Container';
import MyNavbar from '../MyNavbar/MyNavbar';
import Table from 'react-bootstrap/Table';

export default function BookingInfo() {

    const location = useLocation();
    const { bookings } = location.state;

    const { setToken } = useContext(AuthContext);

    const token = localStorage.getItem("token");

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('it-IT', options);
    }


    useEffect(() => {
        setToken(token);
    }, [token])


    return (
        <>
            <MyNavbar />
            <Container>
                <div>
                    <h4>Tutte le prenotazione</h4>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Utente</th>
                                <th>Struttura</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((el, index) => (
                                <tr key={el._id}>
                                    <td>{index + 1}</td>
                                    <td className='d-flex align-items-center'>
                                        <img src={el.user.avatar} alt=""
                                            style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                                        <h6 className='ms-2'>{el.user.name} {el.user.surname}</h6>
                                    </td>
                                    <td>{el.insertion.title}</td>
                                    <td>{formatDate(el.checkInDate)} - {formatDate(el.checkOutDate)}</td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    )
}
