import React, { useContext, useEffect, useState } from 'react';
import "./MyNavbar.css";
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import logoPink from "../../assets/logo-pink.png";
import avatar from "../../assets/avatar.png";
import { GoSearch } from "react-icons/go";
import { AlertContext } from '../AlertProvider/AlertProvider';
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { searchBarContext } from '../SearchBarProvider/SearchBarProvider';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';

export default function MyNavbar(props) {

    const { setSearch, searchForm, placeInput, filteredNavSearch, checkInDate, checkOutDate, guestNum } = props;

    const navigate = useNavigate();

    const { alert, setAlert } = useContext(AlertContext);

    const { searchBar } = useContext(searchBarContext);

    const { setToken } = useContext(AuthContext);

    const [user, setUser] = useState([]);

    const [show, setShow] = useState(true);

    const userAuth = localStorage.getItem("user");

    const fetchUser = (userAuth) => {
        if (userAuth) {
            const userData = JSON.parse(userAuth);
            setUser(userData);
        }
        else {
            console.log("Nessun utente memorizzato in localStorage");
        }
    }

    const handleLogOut = () => {

        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAlert("Logout effettuato con successo!");
        setTimeout(() => {
            setAlert("")
        }, 4000);
        setUser([])
        navigate("/")
    }

    const handleAlertPay = () => {
        setShow(false);
        setAlert("");
        navigate("/myBookings")
    }

    const handleAlert = () => {
        setShow(false);
        setAlert("")
    }

    useEffect(() => {

        fetchUser(userAuth)
    }, [userAuth])


    const renderUserArea = () => {
        if (user && user.length !== 0) {
            return (
                <>
                    <div className='d-flex'>
                        {user.isHost ?
                            <Button variant='transparent' onClick={() => navigate("/hostDashboard")}>Host dashboard</Button>
                            :
                            <Button variant='transparent' onClick={() => navigate("/myBookings")}>Le mie prenotazioni</Button>}
                        <Dropdown>
                            <Dropdown.Toggle variant="transparent">
                                <MdOutlineFormatListBulleted className='mx-2' />
                                <img src={user.avatar ? user.avatar : avatar} alt=""
                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigate("/me")}>Area Riservata</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleLogOut()}>Log Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='d-flex'>
                        <Button variant='transparent' onClick={() => navigate("/signIn")}>Affitta con AirBnb</Button>
                        <Dropdown>
                            <Dropdown.Toggle variant="transparent">
                                <MdOutlineFormatListBulleted className='mx-2' />
                                <img src={avatar} alt=""
                                    style={{ width: "30px", borderRadius: "50%" }} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigate("/signIn")}>Registrati</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate("/logIn")}>Accedi</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <Navbar className="justify-content-around navbar">
                <Navbar.Brand className='nav-icon' onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    <img src={logoPink} alt=""
                        style={{ width: "100px" }} />
                </Navbar.Brand>
                {searchBar &&
                    <Form onSubmit={filteredNavSearch} className='form-search'>
                        <div className="bar">
                            <div className="location">
                                <p>Location</p>
                                <input type="text" placeholder="Dove vuoi andare?"
                                    value={placeInput}
                                    onChange={(e) => setSearch({ ...searchForm, placeInput: e.target.value })} />
                            </div>
                            <div className="check-in">
                                <p>Check in</p>
                                <input type="date" placeholder="Add dates"
                                    onChange={(e) => setSearch({ ...searchForm, checkInDate: e.target.value })} />
                            </div>
                            <div className="check-out">
                                <p>Check out</p>
                                <input type="date" placeholder="Add dates"
                                    onChange={(e) => setSearch({ ...searchForm, checkOutDate: e.target.value })} />
                            </div>
                            <div className="guests">
                                <p>Guests</p>
                                <input type="number" placeholder="Add guests"
                                    min='0'
                                    max='6'
                                    value={guestNum}
                                    style={{ width: "50px" }}
                                    onChange={(e) => setSearch({ ...searchForm, guestNum: e.target.value })} />
                                <span className='btn-navbar'>
                                    <Button variant='transparent' type='submit'>
                                        <GoSearch />
                                    </Button>
                                </span>
                            </div>
                        </div>
                    </Form>

                }

                <div className='user-area'>
                    {renderUserArea()}
                </div>
            </Navbar>
            <div className='alert'>
                {(alert && alert !== "prenotazione") &&
                    <Alert variant='primary'>
                        {alert}
                    </Alert>}
                {alert === "prenotazione" &&
                    <Alert show={show} variant="success">
                        <Alert.Heading>Prenotazione effettuata!</Alert.Heading>
                        <p>
                            La tua prenotazione è stata effettuata, conferma il pagamento nell'area "Le mie prenotazioni"
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button variant='outline-success' className='mx-4' onClick={() => handleAlertPay()}>Conferma e paga!</Button>
                            <Button onClick={() => handleAlert()} variant="outline-success">
                                Continua a navigare
                            </Button>
                        </div>
                    </Alert>}


            </div>
        </>
    )
}
