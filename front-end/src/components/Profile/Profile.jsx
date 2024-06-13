import React, { useContext, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import avatar from "../../assets/avatar.png";
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../MyNavbar/MyNavbar';
import './Profile.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa6";
import { AlertContext } from '../AlertProvider/AlertProvider';
import { searchBarContext } from '../SearchBarProvider/SearchBarProvider';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import MyFooter from '../MyFooter/MyFooter';

export default function Profile() {
    const [data, setData] = useState([]);

    const endpoint = "http://localhost:3001/api/user/me";

    const { setSearchBar } = useContext(searchBarContext);

    const { setToken, token } = useContext(AuthContext);

    const { setAlert } = useContext(AlertContext);

    const endpointPUT = `http://localhost:3001/api/user/${data._id}`;
    const endpointPATCH = `http://localhost:3001/api/user/${data._id}/avatar`;
    const navigate = useNavigate();


    const [mod, setMod] = useState(false);

    const [validated, setValidated] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        date: '',
        address: '',
        work: '',
        avatar: null,
        isHost: false
    });

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        handleSignIn()
    };

    const getProfile = async () => {

        try {
            const res = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.ok) {
                const profile = await res.json();
                setData(profile)
            } else {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/logIn")
            }
        } catch (error) {
            console.error(error);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/logIn")
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token)
        } else {
            navigate("/logIn");
            setAlert("Rieffettua il login");
            setTimeout(() => {
                setAlert("")
            }, 4000);
        }
    }, [])


    const handleSignIn = async () => {
        try {
            const payload = {
                "name": formData.name,
                "surname": formData.surname,
                "email": formData.email,
                "username": formData.username,
                "birthday": formData.date,
                "work": formData.work,
                "address": formData.address,
                "password": formData.password,
                "isHost": formData.isHost
            };

            const res = await fetch(endpointPUT, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            }
            );
            if (res.ok) {
                const results = await res.json();
                console.log(results);
                if (formData.avatar) {
                    const formDataFile = new FormData();
                    formDataFile.append("avatar", formData.avatar);
                    const patch = await fetch(endpointPATCH, {
                        method: "PATCH",
                        body: formDataFile
                    });
                    if (patch.ok) {
                        const newUser = await patch.json();
                        console.log(newUser);
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        localStorage.setItem("user", JSON.stringify(newUser.user));
                        localStorage.setItem("token", newUser.token);
                        setMod(false);
                        getProfile(token);
                        setAlert("Profilo modificato correttamente");
                        setTimeout(() => {
                            setAlert("")
                        }, 4000);
                    }
                } else {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    localStorage.setItem("user", JSON.stringify(results.user));
                    localStorage.setItem("token", results.token);
                    setMod(false);
                    getProfile(token);
                    setAlert("Profilo modificato correttamente");
                    setTimeout(() => {
                        setAlert("")
                    }, 4000);
                }
            }
        } catch (error) {
            console.error(error);
            setAlert("Errore nella modifica  del profilo");
            setTimeout(() => {
                setAlert("")
            }, 4000);
        }


    }

    const handleDelete = async () => {
        try {
            const res = await fetch(endpointPUT, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.ok) {
                await res.json();
                console.log("Utente eliminato");
                setModalShow(false);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
                setAlert("Utente eliminato correttamente");
                setTimeout(() => {
                    setAlert("")
                }, 4000);
            }
        } catch (error) {
            console.error(error, "Errore nell eliminazione utente")
        }
    }

    const dateString = (dateCreation) => {
        const date = new Date(dateCreation);

        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return (
            <h4>{month} {year}</h4>
        )
    }

    const handleLogOut = () => {
        navigate('/', { replace: true });

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.reload();

        setAlert("Logout effettuato correttamente");
        setTimeout(() => {
            setAlert("")
        }, 4000);
    }

    useEffect(() => {
        setSearchBar(false)
    }, [])


    return (
        <>

            <MyNavbar />
            {data &&

                <Row>
                    <Col md={5} xs={12} className='d-block d-md-flex justify-content-center'>
                        <div className='image-prof'>
                            <Row>
                                <Col md={6} xs={6} className='d-flex flex-column align-items-center justify-content-center d-md-block'>
                                    <div>
                                        <img src={data.avatar ? data.avatar : avatar} alt=""
                                            style={{ width: "100px", borderRadius: "50%" }}
                                            className='ms-3' />
                                    </div>
                                    <div>
                                        <h4 className='mt-2' style={{ textAlign: "center" }}>{data.name}</h4>
                                        <h6 style={{ textAlign: "center" }}>{data.isHost ? "Host" : "Guest"}</h6>

                                    </div>
                                </Col>
                                <Col md={6} xs={6} className=' d-flex flex-column justify-content-center'>
                                    <h6>Preferiti</h6>
                                    <h4>{data.favorites ? data.favorites.length : null}</h4>
                                    <hr />
                                    <h6>su AirBnb da</h6>
                                    {dateString(data.createdAt)}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={7} xs={12}>
                        <div>
                            <h2>{`Informazioni su ${data.name}`}</h2>
                        </div>
                        <div className='d-flex my-4'>
                            <div>
                                {mod ?
                                    <Button variant='transparent' style={{ border: "1px solid black" }} onClick={() => setMod(false)}>Torna al tuo profilo</Button>
                                    :
                                    <>
                                        {data && data.googleId ?
                                            <h4>Il profilo Google non è modificabile</h4>
                                            :
                                            <Button variant='transparent' style={{ border: "1px solid black" }} onClick={() => setMod(true)}>Modifica il profilo</Button>
                                        }
                                    </>
                                }
                            </div>
                            <div className='ms-2'>
                                <Button variant='outline-danger' onClick={() => setModalShow(true)}>Elimina profilo</Button>
                            </div>

                        </div>
                        <hr style={{ width: "50%" }} />

                        {mod ?
                            <>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder={data.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci un Nome valido
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="surname">
                                        <Form.Label>Cognome</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={formData.surname}
                                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                            placeholder={data.surname}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci un Cognome valido
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder={data.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci un email valida
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            placeholder={data.username}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci un Username valido
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="date">
                                        <Form.Label>Data di nascita</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            placeholder={data.birthday}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci una data valida
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="address">
                                        <Form.Label>Indirizzo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="Inserisci indirizzo"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci un indirizzo valido
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="work">
                                        <Form.Label>Lavoro</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.work}
                                            onChange={(e) => setFormData({ ...formData, work: e.target.value })}
                                            placeholder="Inserisci un Lavoro"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci un lavoro valido
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder="Inserisci una nuova password"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci una password valida
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="avatar">
                                        <Form.Label>Avatar</Form.Label>
                                        <Form.Control
                                            type="file"
                                            onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
                                            placeholder="Inserisci un avatar"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci un avatar valido
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            disabled
                                            label={data.isHost ? "Sei un host" : "Sei un guest"}
                                            value={data.isHost}
                                            onChange={(e) => setFormData({ ...formData, isHost: e.target.checked })}
                                        />
                                    </Form.Group>
                                    <Button type="submit">Accetta i cambiamenti</Button>

                                </Form>
                            </>
                            :
                            <>
                                <div className='mt-2'>
                                    <Row>
                                        <Col xs={12} md={6} className='d-block d-md-flex align-items-center'>
                                            <div className='info1'>
                                                <div className='m-3'>
                                                    <MdOutlineAlternateEmail />
                                                    <span className='ms-2'><b>Email: </b>{data.email}</span>
                                                </div>
                                                <div className='m-3'>
                                                    <FaRegUserCircle />
                                                    <span className='ms-2'><b>Username: </b>{data.username}</span>
                                                </div>
                                            </div>
                                            <div className='ms-2 info2'>
                                                <div className='m-3'>
                                                    <MdOutlineWorkOutline />
                                                    <span className='ms-2'><b>Lavoro: </b>{data.work ? data.work : (
                                                        <Button variant='transparent' style={{ border: "1px solid black", fontSize: "10px", padding: "2px" }}>Aggiungi lavoro</Button>
                                                    )}</span>
                                                </div>
                                                <div className='m-3'>
                                                    <FaRegAddressCard />
                                                    <span className='ms-2'><b>Indirizzo: </b>{data.address ? data.address :
                                                        <Button variant='transparent' style={{ border: "1px solid black", fontSize: "10px", padding: "2px" }}>Aggiungi indirizzo</Button>
                                                    }</span>
                                                </div>
                                            </div>

                                        </Col>
                                        <div className='ms-2 mt-3 text-xs-center text-md-left'>
                                            <Button variant='danger' onClick={() => handleLogOut()}>Logout</Button>
                                        </div>
                                    </Row>
                                </div>

                            </>
                        }

                    </Col>
                </Row>
            }

            <MyFooter />

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Sicuro di voler eliminare il tuo account?</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Torna indietro</Button>
                    <Button variant='danger' onClick={() => handleDelete()}>Elimina Account</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
