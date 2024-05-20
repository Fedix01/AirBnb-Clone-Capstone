import React, { useContext, useEffect, useState } from 'react';
import "./MyNavbar.css";
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import logoPink from "../../assets/logo-pink.png";
import avatar from "../../assets/avatar.png";
import { GoSearch } from "react-icons/go";
import { AlertContext } from '../AlertProvider/AlertProvider';
import { MdOutlineFormatListBulleted } from "react-icons/md";

export default function MyNavbar() {

    const navigate = useNavigate();

    const { alert, setAlert } = useContext(AlertContext);

    const [user, setUser] = useState([]);

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
        localStorage.removeItem("user");
        setAlert("Logout effettuato con successo!");
        setTimeout(() => {
            setAlert("")
        }, 4000);
        setUser([])
        navigate("/")
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
                            <Button variant='transparent'>Le mie prenotazioni</Button>}
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
                        <Button variant='transparent'>Affitta con AirBnb</Button>
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
                <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    <img src={logoPink} alt=""
                        style={{ width: "100px" }} />
                </Navbar.Brand>
                <div>
                    {/* <div>
                    <Button variant='transparent'>Soggiorni</Button>
                    <Button variant='transparent'>Esperienze</Button>
                    <Button variant='transparent'>esperienze online</Button>
                </div> */}
                    <div className="bar">
                        <div className="location">
                            <p>Location</p>
                            <input type="text" placeholder="Where are you going?" />
                        </div>
                        <div className="check-in">
                            <p>Check in</p>
                            <input type="date" placeholder="Add dates" />
                        </div>
                        <div className="check-out">
                            <p>Check out</p>
                            <input type="date" placeholder="Add dates" />
                        </div>
                        <div className="guests">
                            <p>Guests</p>
                            <input type="text" placeholder="Add guests" />
                            <span>
                                <Button variant='transpatent'>
                                    <GoSearch />
                                </Button></span>
                        </div>
                    </div>
                </div>
                <div>
                    {renderUserArea()}
                </div>
            </Navbar>
            <div className='alert'>
                {alert &&
                    <Alert variant='primary'>
                        {alert}
                    </Alert>}
            </div>
        </>
    )
}
