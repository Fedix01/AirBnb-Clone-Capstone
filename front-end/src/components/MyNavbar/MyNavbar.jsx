import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import logoPink from "../../assets/logo-pink.png";
import avatar from "../../assets/avatar.png";
import "./MyNavbar.css";
import { GoSearch } from "react-icons/go";

export default function MyNavbar() {

    const navigate = useNavigate();



    return (
        <Navbar className="justify-content-around" style={{ borderBottom: "1px solid lightgray" }}>
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
                <Button variant='transparent'>Affitta con AirBnb</Button>
                <Button variant='transparent' onClick={() => navigate("/signIn")}>
                    <img src={avatar} alt=""
                        style={{ width: "50px", borderRadius: "50%" }} />
                </Button>
            </div>
        </Navbar>
    )
}
