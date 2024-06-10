import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import emptyAvatar from "../../assets/avatar.png";
import Container from 'react-bootstrap/Container';
import MyNavbar from '../MyNavbar/MyNavbar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrStatusGoodSmall } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { AlertContext } from '../AlertProvider/AlertProvider';
import MyFooter from '../MyFooter/MyFooter';

export default function BookingInfo() {

    const location = useLocation();
    const { insertionId } = location.state;

    const { setToken } = useContext(AuthContext);

    const [data, setData] = useState([]);

    const { setAlert } = useContext(AlertContext);

    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem("token");

    const endpoint = `http://localhost:3001/api/insertion/`;

    const fetchBookings = async () => {
        try {
            const res = await fetch(`${endpoint}${insertionId}/booking`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const allBookings = await res.json();
                console.log(allBookings);
                setData(allBookings)
            }
        } catch (error) {
            console.error(error)
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('it-IT', options);
    }

    const handleDelete = async (bookingId, insertionId) => {
        setShowModal(false);
        deleteBooking(bookingId, insertionId)
    }

    const deleteBooking = async (bookingId, insertionId) => {
        try {
            const res = await fetch(`${endpoint}${insertionId}/booking/${bookingId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const deleted = await res.json();
                console.log(deleted);
                setAlert("Prenotazione eliminata correttamente");
                setTimeout(() => {
                    setAlert("")
                }, 4000);
                fetchBookings()
            }
        } catch (error) {
            console.error(error);
            setAlert("Errore nell'eliminazione");
            setTimeout(() => {
                setAlert("")
            }, 4000);
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [])


    useEffect(() => {
        setToken(token);
    }, [token])


    return (
        <>
            <MyNavbar />
            <Container>
                <div>
                    <h4>Tutte le prenotazione</h4>
                    <div className='table-responsive'>
                        <Table bordered hover className='table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Utente</th>
                                    <th>Struttura</th>
                                    <th>Date</th>
                                    <th>Totale</th>
                                    <th>Stato</th>
                                    <th>Gestione</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((el, index) => (
                                    <tr key={el._id}>
                                        <td>{index + 1}</td>
                                        <td className='d-flex align-items-center'>
                                            <img src={el.user ? el.user.avatar : emptyAvatar} alt=""
                                                style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                                            <h6 className='ms-2'>{el.user ? el.user.name : ""} {el.user ? el.user.surname : ""}</h6>
                                        </td>
                                        <td>{el.insertion.title}</td>
                                        <td>{formatDate(el.checkInDate)} - {formatDate(el.checkOutDate)}</td>
                                        <td>{el.totalPrice} €</td>
                                        <td className='d-flex align-items-center'>
                                            {el.confirm ?
                                                <>
                                                    <GrStatusGoodSmall className='me-2' style={{ fontSize: "20px", color: "green" }} />
                                                    <h6>Confermato!</h6>
                                                </>
                                                :
                                                <>
                                                    <GrStatusGoodSmall className='me-2' style={{ fontSize: "20px", color: "yellow" }} />
                                                    <h6>In sospeso</h6>
                                                </>
                                            }</td>
                                        <td>
                                            <Button variant='transparent' onClick={() => setShowModal(true)}>
                                                <MdDeleteOutline style={{ fontSize: "30px" }} />
                                            </Button>
                                            <Modal
                                                show={showModal} onHide={() => setShowModal(false)}
                                                centered
                                            >
                                                <Modal.Header closeButton>

                                                </Modal.Header>
                                                <Modal.Body>
                                                    <h4>Eliminare la prenotazione di {el.user ? el.user.name : ""} {el.user ? el.user.surname : ""} ?</h4>

                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button onClick={() => setShowModal(false)}>Chiudi</Button>
                                                    <Button variant='danger' onClick={() => handleDelete(el._id, el.insertion._id)}>Elimina</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>

            <MyFooter />
        </>
    )
}
